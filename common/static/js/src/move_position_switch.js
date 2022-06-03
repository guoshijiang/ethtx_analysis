var sleep = function (time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while (new Date().getTime() < startTime) {
    }
};

// sleep(1000); // 延时函数，单位ms

function callback(result) {
    if (result.code == 200) {
        showMsg("修改成功");
        window.location.reload();
    } else if (result.code == 10000) {
        // window.location.reload();
        showMsg(result.result)
    } else {
        showMsg("未知类型错误");
    }
}

function on_open_submit() {
    r = origin_confirm("确认打开移仓开关")
    if (r == true) {
        path = window.location.pathname
        var formdata = new FormData();
        formdata.append('status', "open");
        send_request("post", formdata, path, callback)
    }
}

function on_close_submit() {
    r = origin_confirm("确认关闭移仓开关")
    if (r == true) {
        path = window.location.pathname
        var formdata = new FormData();
        formdata.append('status', "close");
        send_request("post", formdata, path, callback)
    }
}

function get_side_text(side) {
    if (side == "BUY") {
        return "买"
    } else {
        return "卖"
    }
}

function move_position_desc(formdata) {
    from_api_account = formdata.get('from_api_account')
    from_symbol = formdata.get('from_symbol')
    to_api_account = formdata.get('to_api_account')
    to_symbol = formdata.get('to_symbol')
    from_side = formdata.get('from_side')
    move_size = formdata.get('move_size')
    to_side = "BUY"
    if (from_side == "BUY") {
        to_side = "SELL"
    }
    from_side = get_side_text(from_side)
    to_side = get_side_text(to_side)

    return `账户${from_api_account},${from_side},${from_symbol}合约, 账户${to_api_account},${to_side},${to_symbol}合约, 数量为${move_size}`
}

function on_create_move_position() {
    var form = $('#move_position')[0]; // You need to use standard javascript object here
    var formdata = new FormData(form);
    desc = move_position_desc(formdata)
    r = origin_confirm(desc)
    if (r == true) {
        $('#on_create_move_positions').attr('disabled', "disabled");
        path = '/backoffice/create_move_position/'
        var form = $('#move_position')[0]; // You need to use standard javascript object here
        var formdata = new FormData(form);
        send_request("post", formdata, path, callback)
        $('#on_create_move_positions').removeAttr("disabled");
    } else {
        $('#on_create_move_positions').removeAttr("disabled");
    }
}

$(document).ready(function () {
    function get_opposite_side(side) {
        if (side == "BUY") {
            return "SELL"
        } else {
            return "BUY"
        }
    };
    $('#from_side').change(function () {
        var side = $(this).find('option:selected').val();
        opposite_side = get_opposite_side(side)
        $("#to_side").val(opposite_side);
    });
    $('#to_side').change(function () {
        var side = $(this).find('option:selected').val();
        var opposite_side = get_opposite_side(side)
        $("#from_side").val(opposite_side);
    });
    $('#move_size').bind("input propertychange", function () {
        var val = $(this).val();
        $("#to_move_size").val(val);
    });
});

