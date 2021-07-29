<template>
  <div>
    <!-- New post -->
    <div class="bg-white p-2">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="input-group mb-3">
            <input v-model="newItem.temperature" type="number" min="35.0" max="42.0" class="form-control" aria-label="体温" aria-describedby="bodytemp-addon" />
            <div class="input-group-append">
              <span id="bodytemp-addon" class="input-group-text bg-white">度</span>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-2">
        <button id="saveRecordBtn" type="button" class="btn btn-lg btn-secondary text-white rounded-0" style="width:10rem;" @click="saveRecord">
          <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          記録
        </button>
      </div>
    </div>
    <!-- Old post-->
    <div id="postsCotainer" class="row mx-0 mt-2 bg-transparent">
      <div id="xAxis" />
      <div v-for="post in posts" :key="post.recordId" style="position: relative">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-sm px-1 py-0" style="position: absolute;top: 0px; right: 19px;" @click="showDeleteModal(post)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
          </button>
        </div>
        <div :id="'no_' + post.recordId" />
      </div>
    </div>
    <itemLoader v-if="showLoader" class="pt-4" />
    <!-- Modal -->
    <div id="deleteModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="deleteModalTitle" class="modal-title">記録を削除しますか？</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p id="deleteModalContent" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal" style="width:9rem">キャンセル</button>
            <button id="deleteModalBtn" type="button" class="btn btn-danger" style="width:9rem" @click="deleteRecord">
              <span v-if="saving" span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
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

  // add data
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
    .attr("x", function (d) { return xScale(d[0]) - 30; })
    .attr("y", function (d) { return yScale(d[1]) + 25; })
    .attr("height", 20)
    .attr("width", 60)
    .attr("fill", "#fafafa")

  postSvg.append("g")
    .selectAll("text")
    .data([
      [data.temperature, 0.6]
    ])
    .enter()
    .append("text")
    .attr("x", function (d) { return xScale(d[0]) - 18; })
    .attr("y", function (d) { return yScale(d[1]) + 40; })
    .attr("fill", "#31444e")
    .style("font-size", "0.8rem")
    .text(function (d) { return d[0] + " 度"; });

  // add date
  postSvg.append("rect")
    .attr("x", 20)
    .attr("y", 5)
    .attr("height", 23)
    .attr("width", 130)
    .style("stroke", "#31444e")
    .style("fill", "#fafafa")
    .style("stroke-width", 1);

  postSvg.append("text")
    .attr("x", 26)
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
      xAxisMargin: { top: 30, right: 17, left: 15 },
      xScale: null,
      yScale: null,
      xAxisSvg: null,
      newItem: {
        temperature: null
      },
      posts: [],
      lastEvaluatedKey: null,
      saving: false
    }
  },
  beforeMount () {
    const params = {
      body: {
        clientId: this.$cookies.get('account_id'),
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

      this.showLoader = true;

      const params = {
        body: {
          clientId: this.$cookies.get('account_id'),
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
    },
    saveRecord () {
      const clientId = this.$cookies.get('account_id');
      if (!clientId) { return; }

      $('#saveRecordBtn').attr('disabled', 'disabled');
      this.saving = true;

      const now = new Date();

      const params = {
        body: {
          clientId,
          recordId: now.getTime(),
          temperature: this.newItem.temperature,
          createdAt: this.$getNowString(now)
        }
      };

      API.put('BlueRoseNoteAPIs', '/RecordTemperature', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }
        this.posts.unshift(params.body);
        this.newItem.temperature = null;
      })
      .finally(() => {
        $('#saveRecordBtn').removeAttr('disabled');
        this.saving = false;
      });
    },
    showDeleteModal (post) {
      $('#deleteModalContent').html(post.createdAt + 'の記録を削除しますか？' + '<br />' + '<small>この操作は取り消せません。</small>');
      $('#deleteModalBtn').attr('targetId', post.recordId);

      $('#deleteModal').modal('show');
    },
    deleteRecord () {
      const clientId = this.$cookies.get('account_id');
      if (!clientId) { return; }

      $('#deleteModalBtn').attr('disabled', 'disabled');
      this.saving = true;

      const recordId = $('#deleteModalBtn').attr('targetId');
      if (!recordId) { return; }

      const params = {
        body: {
          clientId,
          recordId: Number(recordId)
        }
      };

      API.del('BlueRoseNoteAPIs', '/RecordTemperature', params)
      .then((response) => {
        if (response.statusCode !== 200) { return; }
        this.posts = this.posts.filter(function (post) {
          return Number(post.recordId) !== Number(recordId);
        });
      })
      .finally(() => {
        $('#deleteModalBtn').removeAttr('disabled');
        $('#deleteModal').modal('hide');
        this.saving = false;
      });
    }
  }
}
</script>