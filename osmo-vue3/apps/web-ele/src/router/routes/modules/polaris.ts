import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '北极星',
    },
    name: 'Polaris',
    path: '/monitor',
    children: [
      {
        name: 'Task',
        path: '/task',
        meta: {
          affixTab: true,
          icon: 'lucide:layout-dashboard',
          title: '任务管理',
        },
        children: [
          {
            name: 'RecordTask',
            path: '/task/record',
            component: () => import('#/views/polaris/task/record/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '录制任务',
            },
          },
          {
            name: 'ReplayTask',
            path: '/task/replay',
            component: () => import('#/views/polaris/task/replay/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '回放任务',
            },
          },
        ],
      },
      {
        name: 'Resource',
        path: '/resource',
        meta: {
          affixTab: true,
          icon: 'lucide:layout-dashboard',
          title: '资源管理',
        },
        children: [
          {
            name: 'ResourcePolaris',
            path: '/resource/monitor',
            component: () => import('#/views/polaris/resource/monitor/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '监控中心',
            },
          },
          {
            name: 'ResourceAgent',
            path: '/resource/agent',
            component: () => import('#/views/polaris/resource/agent/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '执行机监控',
            },
          },

        ],
      },
      {
        name: 'Record',
        path: '/record',
        meta: {
          affixTab: true,
          icon: 'lucide:layout-dashboard',
          title: '录制管理',
        },
        children: [
          {
            name: 'RecordRuleType',
            path: '/record/rule_type',
            component: () => import('#/views/polaris/record/rule_type/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '规则类型',
            },
          },
          {
            name: 'RecordRule',
            path: '/record/rule',
            component: () => import('#/views/polaris/record/rule/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '录制规则',
            },
          },
          {
            name: 'RecordStrategyType',
            path: '/record/strategy_type',
            component: () =>
              import('#/views/polaris/record/strategy_type/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '策略类型',
            },
          },
          {
            name: 'RecordStrategy',
            path: '/record/strategy',
            component: () => import('#/views/polaris/record/strategy/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '录制策略',
            },
          },
        ],
      },
      {
        name: 'Traffic',
        path: '/traffic',
        meta: {
          affixTab: true,
          icon: 'lucide:layout-dashboard',
          title: '流量管理',
        },
        children: [
          {
            name: 'TrafficPool',
            path: '/traffic/pool',
            component: () => import('#/views/polaris/traffic/pool/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '流量池',
            },
          },
          {
            name: 'TrafficClean',
            path: '/traffic/clean',
            component: () => import('#/views/polaris/traffic/clean/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '流量清洗',
            },
          },
        ],
      },
      {
        name: 'Replay',
        path: '/replay',
        meta: {
          affixTab: true,
          icon: 'lucide:layout-dashboard',
          title: '回放管理',
        },
        children: [
          {
            name: 'ReplayAnalysis',
            path: '/replay/analysis',
            component: () => import('#/views/polaris/replay/analysis/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '结果分析',
            },
          },
        ],
      },

    ],
  },
];

export default routes;
