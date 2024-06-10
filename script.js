// Formatting function for row details - modify as you need
function format(d) {
    // `d` is the original data object for the row
    return d.evidence.map(item =>
        '<dl>' +
        '<dt><b>Source:</b></dt>' +
        '<dd>' +
        item.source +
        '</dd>' +
        '<dt><b>Excerpt:</b></dt>' +
        '<dd><i>' +
        item.excerpt.replace(/(?:\r\n|\r|\n)/g, '<br><br>') +
        '</i></dd>' +
        '<dt><b>Link:</b></dt>' +
        '<dd><a href="' + item.link + '">' + item.link + '</a></dd>' +
        '</dl>'
    ).join('<br>');
}

$(document).ready( function () {
    let defaultOptions = {
        ajax: './data.json',
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: ''
            },
            { data: 'name' },
            { data: 'role' },
            { data: 'claim' },
            { data: 'status' },
            { data: 'date' },
            { data: null, defaultContent: '', orderable: false },
            { data: 'id' },
            { data: 'tags' },
        ],
        columnDefs: [
            // { searchable: false, targets: 5 }, 
            {
                "targets": 6,
                "data": "permalink",
                "data_name": "permalink",
                "render": function ( data, type, row, meta ) {
                    return '<a href="/?search.search=' + row.id + '" target="_blank">Permalink</a>';
                    // return '<a href="example.com/member/'+data+'" target="_blank">+data_name+</a>';
                }
            },
            { visible: false, targets: 7 },
            { visible: false, targets: 8 },
        ],
    };
    let searchOptions = $.fn.dataTable.ext.deepLink( [
        'search.search'
    ]);
    console.log(searchOptions);
    let table = $('#scandal-table').DataTable(
        $.extend(defaultOptions, searchOptions));

    // Add event listener for opening and closing details
    table.on('click', 'td.dt-control', function (e) {
        let tr = e.target.closest('tr');
        let row = table.row(tr);
    
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
        }
    });
} );


