export {};

declare global {
  // eslint-disable-next-line no-var
  var allure: {
    startStep: (name: string) => void;
    endStep: () => void;
    attachment: (name: string, content: string, type: string) => void;
  };
}

// Создаем заглушку для Allure
global.allure = {
  startStep: (name: string) => console.log(`[Allure] Start: ${name}`),
  endStep: () => console.log('[Allure] End'),
  attachment: (name: string, content: string) => console.log(`[Allure] Attachment: ${name}`),
};