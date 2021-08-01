<template>
  <div id="postsCotainer" class="row mx-0 mt-2 bg-transparent">
    <div id="xAxis" />
    <div v-for="post in posts" :key="post.recordId" style="position: relative">
      <div :id="'no_' + post.recordId" />
    </div>
    <itemLoader v-if="showLoader" class="pt-4" />
  </div>
</template>

<script>
import API from '@aws-amplify/api';

function drawPost (width, xAxisHeight, postHeight, xScale, yScale, xAxisSvg, data) {
  // posts
  const postSvg = d3.select(`#no_${data.recordId}`)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${postHeight}`)
    .attr("preserveAspectRatio", "xMidYMid");

  // add grid line
  const grid = postSvg.append("g")
    .attr("transform", "translate(0," + postHeight + ")")
    .call(d3.axisTop(xScale).ticks(4).tickSize(postHeight, 0, 0).tickFormat(""));

  grid.select(".domain").attr("visibility", "hidden");
  grid.selectAll("line").attr("stroke", "#C4C4C4").attr("stroke-width", 0.9);

  // add minor grid line
  const minorLine = postSvg.append("g")
    .classed("glid", true)
    .attr("transform", "translate(0," + postHeight + ")")
    .call(d3.axisTop(xScale).ticks(40).tickSize(postHeight, 0, 0).tickFormat(""));

  minorLine.select(".domain").attr("visibility", "hidden");
  minorLine.selectAll("line").attr("stroke", "#C4C4C4").attr("stroke-width", 0.7)
    .attr("stroke-dasharray", "8 4");

  // add data and tip
  if ((data.temperature >= 35.0) && (data.temperature <= 38.0)) {
    postSvg.append("g")
      .selectAll("circle")
      .data([
        [data.temperature, 0.5]
      ])
      .enter()
      .append("circle")
      .attr("cx", function (d) { return xScale(d[0]); })
      .attr("cy", function (d) { return yScale(d[1]); })
      .attr("fill", "#73b3b3")
      .style("opacity", 0.70)
      .attr("r", 10)
      .on("mouseover", function (d, i) {
        d3.select(this).transition()
          .duration('500')
          .style("opacity", 0.60)
          .attr('r', 13);
      })
      .on("mouseout", function () {
        d3.select(this).transition()
          .duration('500')
          .style("opacity", 0.70)
          .attr('r', 10);
      });

    // tip
    postSvg.append("g")
      .selectAll("rect")
      .data([
        [data.temperature, 0.6]
      ])
      .enter()
      .append("rect")
      .attr("x", function (d) { return xScale(d[0]) - 24; })
      .attr("y", function (d) { return yScale(d[1]) + 25; })
      .attr("height", 20)
      .attr("width", 52)
      .attr("fill", "#fafafa")

    postSvg.append("g")
      .selectAll("text")
      .data([
        [data.temperature, 0.6]
      ])
      .enter()
      .append("text")
      .attr("x", function (d) { return xScale(d[0]) - 17; })
      .attr("y", function (d) { return yScale(d[1]) + 40; })
      .attr("fill", "#31444e")
      .style("font-size", "0.8rem")
      .text(function (d) { return d[0] + "度"; });
  } else if (data.temperature > 38.0) {
    postSvg.append("rect")
    .attr("x", function (d) { return width - 60; })
    .attr("y", function (d) { return yScale(0.6) - 6.0; })
    .attr("height", 23)
    .attr("width", 50)
    .style("stroke", "#E6739F")
    .style("fill", "#fafafa")
    .style("stroke-width", 1);

    postSvg.append("text")
    .attr("x", function (d) { return width - 54; })
    .attr("y", function (d) { return yScale(0.6) + 6.0; })
    .attr("dy", ".30em")
    .attr("fill", "#E6739F")
    .style("font-size", "0.8rem")
    .style("font-weight", "bolder")
    .text(data.temperature + "度");
  } else {
    postSvg.append("rect")
    .attr("x", function (d) { return 1; })
    .attr("y", function (d) { return yScale(0.6) - 1.0; })
    .attr("height", 23)
    .attr("width", 50)
    .style("stroke", "#668f9c")
    .style("fill", "#fafafa")
    .style("stroke-width", 1);

    postSvg.append("text")
    .attr("x", function (d) { return 6; })
    .attr("y", function (d) { return yScale(0.6) + 12.0; })
    .attr("dy", ".30em")
    .attr("fill", "#668f9c")
    .style("font-size", "0.8rem")
    .style("font-weight", "bolder")
    .text(data.temperature + "度");
  }

  // add date
  postSvg.append("rect")
    .attr("x", 24)
    .attr("y", 5)
    .attr("height", 23)
    .attr("width", 130)
    .style("stroke", "#31444e")
    .style("fill", "#fafafa")
    .style("stroke-width", 1);

  postSvg.append("text")
    .attr("x", 30)
    .attr("y", 17)
    .attr("dy", ".30em")
    .attr("fill", "#31444e")
    .style("font-size", "0.8rem")
    .text(data.createdAt);

  // responsive
  $(window).on("resize", function () {
    const targetWidth = $("#postsCotainer").width();
    postSvg.attr("width", targetWidth);
    postSvg.attr("height", Math.round(targetWidth / (width / postHeight)));
    xAxisSvg.attr("width", targetWidth);
    xAxisSvg.attr("height", Math.round(targetWidth / (width / xAxisHeight)));
  }).trigger("resize");
}

export default {
  data () {
    return {
      showLoader: true,
      width: null,
      xAxisHeight: 30,
      postHeight: 90,
      xAxisMargin: { top: 30, right: 20, left: 18 },
      xScale: null,
      yScale: null,
      xAxisSvg: null,
      posts: [],
      lastEvaluatedKey: null
    }
  },
  beforeMount () {
    const accountId = JSON.parse(localStorage.getItem('targetProfile'));
    if (!accountId) { return; }

    const params = {
      body: {
        clientId: accountId,
        lastEvaluatedKey: null
      }
    };

    API.post('BlueRoseNoteAPIs', '/RecordTemperature', params)
    .then((response) => {
      if (response.statusCode !== 200) { return; }

      this.posts.push(...JSON.parse(response.body).Items);
      this.lastEvaluatedKey = JSON.parse(response.body).LastEvaluatedKey;
    })
    .finally(() => {
      this.showLoader = false;
    });
  },
  mounted () {
    window.addEventListener("scroll", this.onScroll);
  },
  updated () {
    if (this.posts.length < 1) { return; }

    this.width = $("#postsCotainer").width();

    if ($("#xAxis").children().length === 0) {
      this.xAxisSvg = d3.select("#xAxis").append("svg")
        .attr("viewBox", `0 0 ${this.width} ${this.xAxisHeight}`)
        .attr("preserveAspectRatio", "xMidYMid");

        this.xScale = d3.scaleLinear()
          .domain([35.0, 38.0])
          .range([this.xAxisMargin.left, this.width - this.xAxisMargin.right]);

        this.xAxis = this.xAxisSvg.append("g")
          .attr("transform", "translate(0," + this.xAxisMargin.top + ")")
          .call(d3.axisTop(this.xScale).ticks(7).tickPadding(10).tickFormat(d3.format(".1f")));

        this.xAxis.select(".domain").attr("visibility", "hidden");
        this.xAxis.selectAll(".tick").select("line").attr("stroke", "#C4C4C4").attr("stroke-width", 2.0);
        this.xAxis.selectAll("text").attr("font-size", 16);

        this.yScale = d3.scaleLinear()
          .domain([0, 1])
          .range([this.postHeight, 0]);
    }

    for (let index = 0; index < this.posts.length; index++) {
      if ($(`#no_${this.posts[index].recordId}`).children().length === 0) {
        drawPost(this.width, this.xAxisHeight,
          this.postHeight, this.xScale, this.yScale, this.xAxisSvg,
          this.posts[index]);
      }
    }
  },
  methods: {
    onScroll (event) {
      if ($(window).scrollTop() + window.innerHeight < $(document).height() - 30) {
        return;
      }

      if (!this.lastEvaluatedKey) { return; }

      if (this.showLoader) { return; }

      const accountId = JSON.parse(localStorage.getItem('targetProfile'));
      if (!accountId) { return; }

      this.showLoader = true;

      const params = {
        body: {
          clientId: accountId,
          lastEvaluatedKey: this.lastEvaluatedKey
        }
      };

      API
      .post('BlueRoseNoteAPIs', '/RecordTemperature', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }

        this.posts.push(...JSON.parse(response.body).Items)
        this.lastEvaluatedKey = JSON.parse(response.body).LastEvaluatedKey;
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        this.showLoader = false;
      });
    }
  }
}
</script>