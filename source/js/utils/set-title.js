module.exports = function setTitle(title){
  const def = "Tahanan Project";
  const docTitle = title ? `${title} | ${def}` : def;
  document.title = docTitle;

  console.log(`Navigating to ${docTitle}`);
}
