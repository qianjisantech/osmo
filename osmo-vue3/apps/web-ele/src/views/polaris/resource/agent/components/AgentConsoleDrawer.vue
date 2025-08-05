<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';

import { ElDialog } from 'element-plus';

const props = defineProps({
  modelValue: Boolean,
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

// 数据状态
const logs = ref<string[]>([
  `Last login: ${new Date().toLocaleString()} from 192.168.1.1`,
]);
const command = ref('');
const currentDir = ref(`user@${props.id}:~$`);
const inputRef = ref<HTMLInputElement>();

// 拖动状态
const dragState = ref({
  isDragging: false,
  startY: 0,
  startHeight: 500,
  currentHeight: 500,
  minHeight: 300,
  maxHeight: 800,
});

// 经典Linux命令响应
const executeCommand = () => {
  if (!command.value.trim()) return;

  logs.value.push(`${currentDir.value} ${command.value}`);

  const cmd = command.value.split(' ')[0];
  switch (cmd) {
    case 'clear': {
      logs.value.length = 0;
      break;
    }
    case 'help': {
      logs.value.push('Available commands: ls, clear, help, neofetch');
      break;
    }
    case 'ls': {
      logs.value.push(
        'bin    dev    home   lib    opt    root   sys    usr',
        'boot   etc    lib64  mnt    proc   run    tmp    var',
      );
      break;
    }
    case 'neofetch': {
      logs.value.push(
        `       -/oyddmdhs+:.              Host: ${props.id}`,
        '   -oNMMMMMMMMMMmhh+/`            OS: Linux Mint 21.1',
        ' `yMMMmdhsssssydmNMMMN/`          Kernel: 5.15.0-76-generic',
        '  oMMMy              NMMh+        Uptime: 2 days',
        ' .MMM+               `NMMM/        Shell: bash 5.1.16',
        ' hMMN`                 dMMM.       Terminal: xterm-256color',
        ' NMMM.                 hMMM+       CPU: Intel i7-12700K',
        ' mMMM:                 .NMMd       GPU: NVIDIA RTX 4090',
        ' /MMMd                  sMMM.      Memory: 32GB',
        ' .NMMN`                 `NMMN',
        '  hMMM+                  oMMM/',
        '  `NMMNhsssssssssssssssssNMMN:',
        '   .NMMMMMMMMMMMMMMMMMMMMMMN.',
        '     :mMMMMMMMMMMMMMMMMMMm+`',
        '       .+ydNMMMMMMMMNdyo/.',
      );
      break;
    }
    default: {
      logs.value.push(`bash: ${cmd}: command not found`);
    }
  }

  command.value = '';
  scrollToBottom();
  inputRef.value?.focus();
};

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.terminal-body');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
};

// 拖动处理
const startDrag = (e: MouseEvent) => {
  dragState.value.isDragging = true;
  dragState.value.startY = e.clientY;
  dragState.value.startHeight = dragState.value.currentHeight;
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
  document.body.style.cursor = 'row-resize';
};

const handleDrag = (e: MouseEvent) => {
  if (!dragState.value.isDragging) return;
  const delta = e.clientY - dragState.value.startY;
  dragState.value.currentHeight = Math.max(
    dragState.value.minHeight,
    Math.min(dragState.value.maxHeight, dragState.value.startHeight + delta),
  );
};

const stopDrag = () => {
  dragState.value.isDragging = false;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.body.style.cursor = '';
};

// 初始化
onMounted(() => {
  logs.value.push(
    `Welcome to ${props.id} terminal emulator`,
    "Type 'help' for available commands",
  );
  inputRef.value?.focus();
});
</script>

<template>
  <ElDialog
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="linux-terminal-dialog"
    width="80%"
  >
    <!-- 可拖动调整高度的内容区域 -->
    <div
      class="terminal-body"
      :style="{ height: `${dragState.currentHeight}px` }"
    >
      <div v-for="(log, index) in logs" :key="index" class="log-line">
        <span class="log-content">{{ log }}</span>
      </div>
    </div>

    <!-- 拖动条 -->
    <div class="drag-handle" @mousedown="startDrag"></div>

    <!-- 命令行输入区 -->
    <div class="terminal-footer">
      <span class="prompt">{{ currentDir }}</span>
      <input
        ref="inputRef"
        v-model="command"
        class="command-input"
        @keyup.enter="executeCommand"
        autofocus
      />
    </div>
  </ElDialog>
</template>

<style scoped lang="scss">
:deep(.linux-terminal-dialog) {
  .el-dialog__header {
    padding: 0;
    margin: 0;
    background: #300a24;
  }

  .el-dialog__body {
    padding: 0;
    display: flex;
    flex-direction: column;
    background: #1e1e1e;
  }
}

.terminal-header {
  padding: 10px 15px;
  background: #151415;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #444;

  .title {
    color: #4caf50;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    font-size: 14px;
  }

  .close-btn {
    background: none;
    border: none;
    color: #aaa;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #f0f0f0;
    }
  }
}

.terminal-body {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #1e1e1e;
  font-family: 'Courier New', monospace;
  color: #f0f0f0;
  line-height: 1.5;
  transition: height 0.2s;

  .log-line {
    white-space: pre-wrap;
    word-break: break-all;
    margin-bottom: 2px;
  }
}

.drag-handle {
  height: 6px;
  background: #151415;
  cursor: row-resize;
  position: relative;
  z-index: 1;

  &:hover {
    background: #4caf50;
  }

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: #666;
    border-radius: 2px;
  }
}

.terminal-footer {
  padding: 10px 15px;
  background: #151415;
  display: flex;
  align-items: center;
  font-family: 'Courier New', monospace;

  .prompt {
    color: #4caf50;
    margin-right: 8px;
    white-space: nowrap;
  }

  .command-input {
    flex: 1;
    background: transparent;
    border: none;
    color: #f0f0f0;
    font-family: 'Courier New', monospace;
    outline: none;
    caret-color: #4caf50;
  }
}
</style>
