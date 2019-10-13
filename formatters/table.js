const { flow, map, toString } = require('lodash')
const Table = require('cli-table');

function render (table) {
  return () => flow(
    t => t.toString(),
    t => console.log(t)
  )(table)
}

module.exports = function ({ head, rows }) {

  const table = new Table({
    head: [].concat(head)
  });

  [].concat(rows)
  .forEach(addRow);

  function addRow (row) {
    table.push(map(row, toString));
  }

  return {
    render: render(table),
    addRow,
  }
}
