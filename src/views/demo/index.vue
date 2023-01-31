<script lang="jsx">
import Canvas from '@antv/f2-vue';
import { Chart, Interval, Axis, ScrollBar, Tooltip } from '@antv/f2';
import EchartDemo from './echart.vue';
export default {
  name: 'App',
  data() {
    return {
      chartData: [],
    };
  },
  mounted() {
    fetch('https://gw.alipayobjects.com/os/antfincdn/ZpWsTPpY6%26/steps.json')
      .then((res) => res.json())
      .then((data) => {
        this.chartData = data;
      });
  },
  render() {
    const { chartData } = this;
    return (
      <div className="container">
        <div class="f2">
          <Canvas pixelRatio={window.devicePixelRatio}>
            <Chart data={chartData}>
              <Axis field="date" type="timeCat" tickCount={5} />
              <Axis field="steps" formatter={this.formatNumber} />
              <Interval x="date" y="steps" />
              <ScrollBar mode="x" range={[0.1, 0.3]} />
              <Tooltip />
            </Chart>
          </Canvas>
        </div>
        <div class="echart">
          <EchartDemo data={chartData} />
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
</style>
