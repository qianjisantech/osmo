import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '流量录制和回放',
    },
    name: 'Gosmo',
    path: '/gosmo',
    children: [
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
            name: 'ResourceAgent',
            path: '/resource/agent',
            component: () => import('#/views/gosmo/resource/agent/index.vue'),
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
            component: () => import('#/views/gosmo/record/rule_type/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '规则类型',
            },
          },
          {
            name: 'RecordRule',
            path: '/record/rule',
            component: () => import('#/views/gosmo/record/rule/index.vue'),
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
              import('#/views/gosmo/record/strategy_type/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '策略类型',
            },
          },
          {
            name: 'RecordStrategy',
            path: '/record/strategy',
            component: () => import('#/views/gosmo/record/strategy/index.vue'),
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
            component: () => import('#/views/gosmo/traffic/pool/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '流量池',
            },
          },
          {
            name: 'TrafficClean',
            path: '/traffic/clean',
            component: () => import('#/views/gosmo/traffic/clean/index.vue'),
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
            component: () => import('#/views/gosmo/replay/analysis/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '结果分析',
            },
          },
        ],
      },
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
            component: () => import('#/views/gosmo/task/record/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '录制任务',
            },
          },
          {
            name: 'ReplayTask',
            path: '/task/replay',
            component: () => import('#/views/gosmo/task/replay/index.vue'),
            meta: {
              affixTab: true,
              icon: 'lucide:layout-dashboard',
              title: '回放任务',
            },
          },
        ],
      },
    ],
  },
];

export default routes;
