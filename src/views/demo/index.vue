<script lang="jsx">
import EchartDemo from './echart.vue';
import { toRaw } from 'vue';
export default {
  name: 'App',
  data() {
    return {
      chartData: [],
    };
  },
  mounted() {
    fetch('/api/orders/steps')
      .then((res) => res.json())
      .then((data) => {
        this.chartData = data;
      });
  },
  render() {
    const { chartData } = this;
    return (
      <div class="container">
        <div class="echart">
          <EchartDemo data={toRaw(chartData)} />
        </div>

        <div class="vs">
          <h1 class="vs-title">Echart vs F2</h1>
          <table class="tbl">
            <thead>
              <tr>
                <th></th>
                <th width="130">echart</th>
                <th width="130">f2</th>
              </tr>
            </thead>
            <tbody class="tbody">
              <tr>
                <td>性能</td>
                <td>良好</td>
                <td class="yes">更优</td>
              </tr>
              <tr>
                <td>易用性</td>
                <td class="yes">更优</td>
                <td>良好</td>
              </tr>
              <tr>
                <td>兼容性</td>
                <td>良好</td>
                <td>良好</td>
              </tr>
              <tr>
                <td>扩展性</td>
                <td>良好</td>
                <td class="yes">更优</td>
              </tr>
              <tr>
                <td>包大小</td>
                <td>良好</td>
                <td class="yes">更优</td>
              </tr>
              <tr>
                <td>社区</td>
                <td class="yes">更优</td>
                <td>一般</td>
              </tr>
              <tr>
                <td>文档完整性</td>
                <td class="yes">更优</td>
                <td>一般</td>
              </tr>
              <tr>
                <td>npm下载量</td>
                <td class="yes">377000</td>
                <td>2314</td>
              </tr>
              <tr>
                <td>Star数</td>
                <td class="yes">54k</td>
                <td>7.8k</td>
              </tr>
              <tr>
                <td>是否支持ts</td>
                <td class="yes">支持</td>
                <td>不支持</td>
              </tr>
              <tr>
                <td>框架契合度</td>
                <td class="yes">更优</td>
                <td>良好</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  },
  methods: {
    formatNumber(n) {
      return String(Math.floor(n * 100) / 100).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      );
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  /* width: 95%; */
  min-height: 100vh;
  /* margin: 0 auto; */
  background-color: #fff;
}
.f2,
.echart {
  width: 100%;
  height: 50vh;
}
.f2 {
  /* margin-bottom: 10px; */
  border-bottom: 1px solid #eee;
}

.vs-title {
  text-align: center;
  margin: 20px 0;
  color: #666;
}
.tbl {
  width: 100%;
  padding-bottom: 10px;
}
.tbody tr td {
  text-align: center;
}
.tbody tr td:first-child {
  text-align: left;
}
.yes {
  color: #ee1313;
}
</style>
