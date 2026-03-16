/**
 * Creates a custom menu in the Google Sheets UI.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📊 Sparkline Helper')
    .addItem('Open Sparkline Helper', 'showSparklineSidebar')
    .addToUi();
}

/**
 * Displays the HTML file as a Sidebar.
 * This is persistent and fits perfectly into the Google Sheets workflow.
 */
function showSparklineSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle('Sparkline Helper');
  
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Gets the A1 notation of the currently selected range.
 */
function getSelectedRange() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const range = sheet.getActiveRange();
    return range ? range.getA1Notation() : '';
  } catch (e) {
    return '';
  }
}

/**
 * Gets the actual values from the selection to show in the preview.
 * It flattens the range and filters for numbers.
 */
function getSelectedData() {
  try {
    const range = SpreadsheetApp.getActiveRange();
    if (!range) return [];
    const values = range.getValues();
    // Flatten 2D array and filter for numbers
    const flat = values.reduce((acc, row) => acc.concat(row), [])
                       .filter(cell => typeof cell === 'number');
    return flat;
  } catch (e) {
    return [];
  }
}

/**
 * Inserts the generated formula into a specific target cell.
 */
function insertFormula(formula, targetCell) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = targetCell ? sheet.getRange(targetCell) : sheet.getActiveCell();
  range.setFormula(formula);
  SpreadsheetApp.getActive().toast(`Formula inserted at ${range.getA1Notation()}`, 'Success');
}