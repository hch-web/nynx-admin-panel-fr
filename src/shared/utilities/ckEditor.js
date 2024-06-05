export const toolbarItems = [
  'selectAll',
  'undo',
  'redo',
  '|',
  'bold',
  'italic',
  'blockQuote',
  'link',
  'heading',
  '|',
  'indent',
  'outdent',
  'numberedList',
  'bulletedList',
];

export const defaultConfig = {
  toolbar: toolbarItems,
};

export const chatConfig = {
  toolbar: [...toolbarItems, '|', 'insertTable', 'tableColumn', 'tableRow'],
};
