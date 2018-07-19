/// <reference path="jquery-1.8.0.min.js" />
var msg = new Array();
msg[0] = "邮箱/手机号码为用户名，并用于找回密码，接收订单通知等服务";
msg[1] = "<span class=\"icon\"></span>此手机号已注册，请更换其它手机号，或使用该<a href=\"Signin.aspx?Email={#Email#}\" name=\"mobile_login_link\" class=\"more\">手机号登录</a>";
msg[2] = "<span class=\"icon\"></span>邮箱/手机格式不正确，请重新输入";
msg[3] = "<span class=\"icon\"></span>该邮箱已被注册，请更换其它邮箱，或使用该<a href=\"Signin.aspx?Email={#Email#}\" name=\"email_login_link\" class=\"more\">邮箱登录</a>";
msg[4] = "<span class=\"icon\"></span>您的短信发送次数超过上限,请明天再试";
msg[5] = "<span class=\"icon\"></span>抱歉，您必须同意当当网的服务条款后，才能提交注册。";
msg[6] = "<span class=\"icon\"></span>邮箱/手机号码不能为空";
msg[7] = "密码为6-20个字符，可由英文、数字及符号组成。建议不要与邮箱登录密码相同";
msg[8] = "<span class=\"icon\"></span>登录密码不能为空";
msg[9] = "<span class=\"icon\"></span>密码长度6-20个字符，请重新输入";
msg[10] = "请再次输入密码";
msg[11] = "<span class=\"icon\"></span>两次输入的密码不一致,请重新输入";
msg[12] = "<span class=\"icon\"></span>密码不能为空";
//msg[13] = "<span class=\"icon\"></span>密码不能包含“空格”，请重新输入";
msg[14] = "<span class=\"icon\"></span>图形验证码错误";
msg[15] = "<span class=\"icon\"></span>验证码错误";
msg[16] = "请输入图片中的字符，不区分大小写";
msg[17] = "还是没有收到短信？请检查您的手机明天再试";
msg[18] = "验证码已经发送到您的手机上";
msg[19] = "<span class=\"icon\"></span>网络繁忙，请稍后重新点击“提交注册”按钮重试。";
msg[20] = "<span class=\"icon\"></span>请输入图形验证码";
msg[21] = "获取验证码";
msg[22] = "<span class=\"icon\"></span>请输入验证码";

var checkEmail = false;
var checkpassword = false;
var checkRepassword = false;
var VerifyCode = false;
var checkpop_sms_vcode = false;
var checkpop_vcode = false;

function show_vcode(img_id) {
    $('#' + img_id).attr('src', 'p/tmp_proxy.aspx?t=' + new Date().getTime());
}

function show_error(err_code) {
    switch (err_code) {
        case 0:
            break;
        case 1:
            $('#txt_vcode').val('');
            $('#txt_vcode').attr('class', 'text wrong').css('border-color', '');
            $('#spn_vcode_ok').html('').attr('class', '');
            $('#spn_vcode_wrong').attr('class', 'cue');
            $('#spn_vcode_wrong').html(msg[14]);
            $('#spn_vcode_wrong').css({ 'display': '' });
            show_vcode('imgVcode');
            break;
        case 2:
            $('#txt_username').attr('class', 'text wrong').css('border-color', '');
            $('#spn_username_ok').hide();
            $('#spn_username_wrong').attr('class', 'cue');
            $('#spn_username_wrong').html(msg[3].replace('{#Email#}', $('#txt_username').val()));
            $('#spn_username_wrong').css({ 'display': '' });
            break;
        case 3:
            $('#txt_username').attr('class', 'text wrong').css('border-color', '');
            $('#spn_username_ok').hide();
            $('#spn_username_wrong').attr('class', 'cue');
            $('#spn_username_wrong').html(msg[2]);
            $('#spn_username_wrong').css({ 'display': '' });
            break;
        case 4:
            $('#txt_pop_vcode').val('');
            $('#txt_pop_vcode').attr('class', 'text wrong').css('border-color', '');
            $('#spn_pop_vcode_ok').hide();
            $('#p_pop_vcode_wrong').attr('class', 'cue');
            $('#p_pop_vcode_wrong').html(msg[14]);
            $('#p_pop_vcode_wrong').css({ 'display': '' });
            show_vcode('popImgVcode');
            break;
        case 5:
            $('#txt_username').attr('class', 'text wrong').css('border-color', '');
            $('#spn_username_ok').hide();
            $('#spn_username_wrong').attr('class', 'cue');
            $('#spn_username_wrong').html(msg[2]);
            $('#spn_username_wrong').css({ 'display': '' });
            break;
        case 6:
            $('#txt_pop_sms_vcode').attr('class', 'text wrong').css('border-color', '');
            $('#spn_pop_sms_vcode_ok').hide();
            $('#p_pop_sms_vcode_wrong').addClass('cue');
            $('#p_pop_sms_vcode_wrong').html(msg[15]);
            break;
        case 7:
            $('#txt_username').attr('class', 'text wrong').css('border-color', '');
            $('#spn_username_ok').hide();
            $('#spn_username_wrong').attr('class', 'cue');
            $('#spn_username_wrong').html(msg[1].replace('{#Email#}', $('#txt_username').val()));
            $('#spn_username_wrong').css({ 'display': '' });
            break;
        case 8:
            $('#spn_err_msg').html(msg[19]);
            break;
        case 9:
            $('#txt_password').attr('class', 'text wrong').css('border-color', '');
            $('#spn_password_ok').hide();
            $('#spn_password_wrong').attr('class', 'cue');
            $('#spn_password_wrong').html(msg[9]);
            $('#spn_password_wrong').css({ 'display': '' });
            break;
        case 10:
            $('#txt_username').attr('class', 'text wrong').css('border-color', '');
            $('#spn_username_ok').hide();
            $('#spn_username_wrong').attr('class', 'cue');
            $('#spn_username_wrong').html(msg[4]);
            $('#spn_username_wrong').css({ 'display': '' });
            break;
        case 11:
            $('#spn_err_msg').html(msg[19]);
            break;
        default:
            break;
    }
}

function check_focus(txtid, spn_ok, spn_wrong) {
    $(txtid).attr('class', 'text').css('border-color', '#FF8E42');
    $(spn_ok).hide();
    $(spn_wrong).attr('class', 'warn').css({ 'display': '' });
}

function check_username_focus() {
    check_focus('#txt_username', '#spn_username_ok', '#spn_username_wrong');
    $('#spn_username_wrong').html(msg[0]);
}

function username_check() {
    var username = $.trim($('#txt_username').val());
    $('#spn_username_ok').html('').hide();
    $('#spn_username_wrong').html('').hide();
    checkEmail = false;
    var usernameExist = false;
    if (username == '') {
        $('#spn_username_ok').hide();
        $('#spn_username_wrong').hide();
        return false;
    }
    if (!/^\d+$/.test(username)) {
        if (username.length > 40 || !/^[.\-_a-zA-Z0-9]+@[\-_a-zA-Z0-9]+\.[a-zA-Z0-9]{1,}/.test(username)) {
            $('#txt_username').attr('class', 'text wrong').css('border-color', '');
            $('#spn_username_ok').hide();
            $('#spn_username_wrong').attr('class', 'cue');
            $('#spn_username_wrong').html(msg[2]);
            $('#spn_username_wrong').css({ 'display': '' });
            return false;
        }
        if (/[ ]/.test(username)) {
            $('#txt_username').attr('class', 'text wrong').css('border-color', '');
            $('#spn_username_ok').hide();
            $('#spn_username_wrong').attr('class', 'cue');
            $('#spn_username_wrong').html(msg[2]);
            $('#spn_username_wrong').css({ 'display': '' });
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'p/email_checker.aspx',
            data: 'email=' + username,
            async: false,
            success: function (flg) {
                if (flg == "true") {
                    $('#txt_username').attr('class', 'text wrong').css('border-color', '');
                    $('#spn_username_ok').hide();
                    $('#spn_username_wrong').attr('class', 'cue');
                    $('#spn_username_wrong').html(msg[3].replace('{#Email#}', username));
                    $('#spn_username_wrong').css({ 'display': '' });
                    usernameExist = true;
                    return;
                }
            }
        });
    } else {
        if (!/^1[3,4,5,8][0-9]{9}$/.test(username)) {
            $('#txt_username').attr('class', 'text wrong').css('border-color', '');
            $('#spn_username_ok').hide();
            $('#spn_username_wrong').attr('class', 'cue');
            $('#spn_username_wrong').html(msg[2]);
            $('#spn_username_wrong').css({ 'display': '' });
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'p/mobile_checker.aspx',
            data: 'mobile=' + username,
            async: false,
            success: function (flg) {
                if (flg == "true") {
                    $('#txt_username').attr('class', 'text wrong').css('border-color', '');
                    $('#spn_username_ok').hide();
                    $('#spn_username_wrong').attr('class', 'cue');
                    $('#spn_username_wrong').html(msg[1].replace('{#Email#}', username));
                    $('#spn_username_wrong').css({ 'display': '' });
                    usernameExist = true;
                    return;
                }
            }
        });
    }
    if (usernameExist == true) {
        return false;
    }
    $('#txt_username').attr('class', 'text');
    $('#spn_username_wrong').hide();
    $('#spn_username_ok').html('');
    $('#spn_username_ok').attr('class', 'icon_yes');
    $('#spn_username_ok').css({ 'display': '' });
    checkEmail = true;
    return true;
}

function check_password_focus() {
    check_focus('#txt_password', '#spn_password_ok', '#spn_password_wrong');
    $('#spn_password_wrong').html(msg[7]);
    $('#spnPwdStrongTips').hide();
}

function password_check() {
    var password = $('#txt_password').val();
    $('#txt_password').attr('class', 'text');
    $('#spn_password_ok').hide();
    $('#spn_password_wrong').attr('class', 'warn');
    $('#spn_password_wrong').html(msg[7]);
    $('#spn_password_wrong').css({ 'display': '' });
    checkpassword = false;
    if (password == '') {
        $('#spn_password_ok').hide();
        $('#spn_password_wrong').hide();
        $('#spnPwdStrongTips').hide();
        return false;
    }
    if (password.length < 6 || password.length > 20) {
        $('#txt_password').attr('class', 'text wrong').css('border-color', '');
        $('#spn_password_ok').hide();
        $('#spn_password_wrong').attr('class', 'cue');
        $('#spn_password_wrong').html(msg[9]);
        $('#spn_password_wrong').css({ 'display': '' });
        $('#spnPwdStrongTips').hide();
        return false;
    }
    if (!/^\S{1,20}$/.test(password)) {
        $('#txt_password').attr('class', 'text wrong').css('border-color', '');
        $('#spn_password_ok').hide();
        $('#spn_password_wrong').attr('class', 'cue');
        $('#spn_password_wrong').html(msg[9]);
        $('#spn_password_wrong').css({ 'display': '' });
        $('#spnPwdStrongTips').hide();
        return false;
    }
    $('#txt_password').attr('class', 'text');
    $('#spn_password_wrong').hide();
    $('#spn_password_ok').hide();
    $('#spnPwdStrongTips').css('display', '');
    checkpassword = true;
    return true;
}

function txtPassword_strong_check() {
    var password = $('#txt_password').val();
    var passwordTrim = $.trim(password);
    if (passwordTrim.length == 0) {
        return;
    }
    $('#spn_password_ok').hide();
    $('#spn_password_wrong').hide();
    $('#txt_password').attr('class', 'text');
    if (passwordTrim.length < 6) {
        $('#spnPwdStrong1').css('display', '');
        $('#spnPwdStrong2').hide();
        $('#spnPwdStrong3').hide();
        $('#spnPwdStrongTips').css('display', '');
        return;
    }
    var chenum = checkStrong();
    if (chenum == 0) {
        return;
    } else if (chenum == 1) {
        $('#spnPwdStrong1').css('display', '');
        $('#spnPwdStrong2').hide();
        $('#spnPwdStrong3').hide();
    } else if (chenum == 2) {
        $('#spnPwdStrong1').hide();
        $('#spnPwdStrong2').css('display', '');
        $('#spnPwdStrong3').hide();
    } else if (chenum >= 3) {
        $('#spnPwdStrong1').hide();
        $('#spnPwdStrong2').hide();
        $('#spnPwdStrong3').css('display', '');
    }
    $('#spnPwdStrongTips').css('display', '');
    return;
}

function check_repassword_focus() {
    check_focus('#txt_repassword', '#spn_repassword_ok', '#spn_repassword_wrong');
    $('#spn_repassword_wrong').html(msg[10]);
}

function repassword_check() {
    var rep_password = $('#txt_repassword').val();
    $('#txt_repassword').attr('class', 'text');
    $('#spn_repassword_ok').hide();
    $('#spn_repassword_wrong').attr('class', 'warn');
    $('#spn_repassword_wrong').html(msg[7]);
    $('#spn_repassword_wrong').css({ 'display': '' });
    checkRepassword = false;
    if (rep_password == '') {
        $('#spn_repassword_ok').hide();
        $('#spn_repassword_wrong').hide();
        return false;
    }
    if (rep_password.length < 6 || rep_password.length > 20) {
        $('#txt_repassword').attr('class', 'text wrong').css('border-color', '');
        $('#spn_repassword_ok').hide();
        $('#spn_repassword_wrong').attr('class', 'cue');
        $('#spn_repassword_wrong').html(msg[9]);
        $('#spn_repassword_wrong').css({ 'display': '' });
        return false;
    }
    if (!/^\S{1,20}$/.test(rep_password)) {
        $('#txt_repassword').attr('class', 'text wrong').css('border-color', '');
        $('#spn_repassword_ok').hide();
        $('#spn_repassword_wrong').attr('class', 'cue');
        $('#spn_repassword_wrong').html(msg[9]);
        $('#spn_repassword_wrong').css({ 'display': '' });
        return false;
    }
    if (rep_password != $('#txt_password').val()) {
        $('#txt_repassword').attr('class', 'text wrong').css('border-color', '');
        $('#spn_repassword_ok').hide();
        $('#spn_repassword_wrong').attr('class', 'cue');
        $('#spn_repassword_wrong').html(msg[11]);
        $('#spn_repassword_wrong').css({ 'display': '' });
        return false;
    }
    if (password_check()) {
        $('#spn_repassword_ok').css({ 'display': '' });
    } else {
        $('#spn_repassword_ok').hide();
    }
    $('#txt_repassword').attr('class', 'text');
    $('#spn_repassword_wrong').hide();
    $('#spn_repassword_ok').html('');
    $('#spn_repassword_ok').attr('class', 'icon_yes');
    checkRepassword = true;
    return true;
}

function check_vcode_focus() {
    check_focus('#txt_vcode', '#spn_vcode_ok', '#spn_vcode_wrong');
    $('#spn_vcode_ok').html('').attr('class', '').css({ 'display': '' });
    $('#spn_vcode_wrong').html(msg[16]);
}

function vcode_check() {
    if ($('#imgVcode').length == 0) {
        return true;
    }
    var vcode = $('#txt_vcode').val();
    $('#txt_vcode').attr('class', 'text');
    $('#spn_vcode_ok').html('').attr('class', '');
    $('#spn_vcode_wrong').html(msg[16]).attr('class', 'warn').css({ 'display': '' });
    VerifyCode = false;
    var vcodeIsWrong = false;
    if (vcode == '') {
        $('#spn_vcode_wrong').hide();
        return false;
    }
    if (!/\w{4}/.test(vcode)) {
        $('#txt_vcode').attr('class', 'text wrong').css('border-color', '');
        $('#spn_vcode_ok').html('').attr('class', '');
        $('#spn_vcode_wrong').attr('class', 'cue');
        $('#spn_vcode_wrong').html(msg[14]);
        $('#spn_vcode_wrong').css({ 'display': '' });
        return false;
    }
    $.ajax({
        type: 'POST',
        url: 'p/vcode_check.aspx',
        data: 'vcode=' + vcode,
        async: false,
        success: function (flg) {
            if (flg == 'false') {
                $('#txt_vcode').attr('class', 'text wrong').css('border-color', '');
                $('#spn_vcode_ok').html('').attr('class', '');
                $('#spn_vcode_wrong').attr('class', 'cue');
                $('#spn_vcode_wrong').html(msg[14]);
                $('#spn_vcode_wrong').css({ 'display': '' });
                show_vcode('imgVcode');
                vcodeIsWrong = true;
                return;
            }
        }
    });
    if (vcodeIsWrong == true) {
        return false;
    }
    $('#txt_vcode').attr('class', 'text');
    $('#spn_vcode_wrong').hide();
    $('#spn_vcode_ok').html('').attr('class', 'icon_yes').css({ 'display': '' });
    VerifyCode = true;
    return true;
}

function checkStrong() {
    var sPW = $('#txt_password').val();
    if (sPW.length < 1)
        return 0;
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        Modes |= Evaluate(sPW.charCodeAt(i));
    }
    var num = bitTotal(Modes);
    return num;
}
function Evaluate(character) {
    if (character >= 48 && character <= 57)
        return 1;
    if (character >= 65 && character <= 90)
        return 2;
    if (character >= 95 && character <= 122)
        return 4;
    else
        return 8;
}

function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}

function CheckdoSubmit(e) {
    var ev = window.event || e;
    if (ev.keyCode == 13) {
        check_register();
    }
}

function reg_submit(buttonname) {
    if (buttonname == "regbutton") {
        return true;
    } else {
        return false;
    }
}

function agreeement_check() {
    if ('checked' == $('#chb_agreement').attr('checked')) {
        $('#spn_agreement_wrong').css('display', 'none');
        return true;
    } else {
        $('#spn_agreement_wrong').html(msg[5]);
        $('#spn_agreement_wrong').css('display', '');
        return false;
    }
}

function check_register() {
    var usernameTrim = $('#txt_username').val();
    var passwordTrim = $('#txt_password').val();
    var repasswordTrim = $('#txt_repassword').val();
    var vcodeTrim = "";
    if ($('#imgVcode').length > 0) {
        vcodeTrim = $('#txt_vcode').val();
    } else {
        vcodeTrim = "1111";
    }
    if ($.trim(usernameTrim) == "" || $.trim(passwordTrim) == "" || $.trim(repasswordTrim) == "" || $.trim(vcodeTrim) == "") {
        if (usernameTrim == "") {
            $('#txt_username').attr('class', 'text wrong').css('border-color', '');
            $('#spn_username_ok').hide();
            $('#spn_username_wrong').attr('class', 'cue');
            $('#spn_username_wrong').html(msg[6]);
            $('#spn_username_wrong').css({ 'display': '' });
        }
        if (passwordTrim == "") {
            $('#txt_password').attr('class', 'text wrong').css('border-color', '');
            $('#spn_password_ok').hide();
            $('#spn_password_wrong').attr('class', 'cue');
            $('#spn_password_wrong').html(msg[8]);
            $('#spn_password_wrong').css({ 'display': '' });
        }
        if (repasswordTrim == "") {
            $('#txt_repassword').attr('class', 'text wrong').css('border-color', '');
            $('#spn_repassword_ok').hide();
            $('#spn_repassword_wrong').attr('class', 'cue');
            $('#spn_repassword_wrong').html(msg[12]);
            $('#spn_repassword_wrong').css({ 'display': '' });
        }
        if (vcodeTrim == "") {
            $('#txt_vcode').val('');
            $('#txt_vcode').attr('class', 'text wrong').css('border-color', '');
            $('#spn_vcode_ok').html('').attr('class', '');
            $('#spn_vcode_wrong').attr('class', 'cue');
            $('#spn_vcode_wrong').html(msg[20]);
            $('#spn_vcode_wrong').css({ 'display': '' });
        }
        return false;
    }
    if (agreeement_check() && vcode_check() && username_check() && password_check() && repassword_check()) {
        $("#register_form")[0].onsubmit = function () { return reg_submit("regbutton"); }
        $('#btn_confirm').click();
        return true;
    }
    return false;
}

function check_pop_sms_vcode_focus() {
    $('#txt_pop_sms_vcode').attr('class', 'text').css('border-color', '#FF8E42');
    $('#spn_pop_sms_vcode_ok').hide();
    $('#p_pop_sms_vcode_wrong').html('');
    $('#p_pop_sms_vcode_wrong').attr('class', 'hint');
}

function pop_sms_vcode_check() {
    var pop_sms_vcode = $('#txt_pop_sms_vcode').val();
    check_pop_sms_vcode_focus();
    $('#txt_pop_sms_vcode').css('border-color', '')
    checkpop_sms_vcode = false;
    if ($.trim(pop_sms_vcode) == '') {
        return true;
    }
    if (pop_sms_vcode.length != 6) {
        $('#txt_pop_sms_vcode').attr('class', 'text wrong').css('border-color', '');
        $('#spn_pop_sms_vcode_ok').hide();
        $('#p_pop_sms_vcode_wrong').addClass('cue').html(msg[15]);
        return false;
    }
    $('#spn_pop_sms_vcode_ok').css({ 'display': '' });
    checkpop_sms_vcode = true;
    return true;
}

function check_pop_vcode_focus() {
    $('#txt_pop_vcode').attr('class', 'text').css('border-color', '#FF8E42');
    $('#spn_pop_vcode_ok').hide();
    $('#p_pop_vcode_wrong').html('').hide();
}

function pop_vcode_check() {
    if ($('#popImgVcode').length == 0) {
        return true;
    }
    var vcode = $('#txt_pop_vcode').val();
    check_pop_vcode_focus();
    $('#txt_pop_vcode').css('border-color', '')
    checkpop_vcode = false;
    var vcodeIsWrong = false;
    if (vcode == '') {
        return false;
    }
    if (!/\w{4}/.test(vcode)) {
        $('#txt_pop_vcode').attr('class', 'text wrong').css('border-color', '').val('');
        $('#spn_pop_vcode_ok').hide();
        $('#p_pop_vcode_wrong').attr('class', 'cue').html(msg[14]).css({ 'display': '' });
        return false;
    }
    $.ajax({
        type: 'POST',
        url: 'p/vcode_check.aspx',
        data: 'vcode=' + vcode,
        async: false,
        success: function (flg) {
            if (flg == 'false') {
                $('#txt_pop_vcode').attr('class', 'text wrong').css('border-color', '').val('');
                $('#spn_pop_vcode_ok').hide();
                $('#p_pop_vcode_wrong').attr('class', 'cue').html(msg[14]).css({ 'display': '' });
                show_vcode('popImgVcode');
                vcodeIsWrong = true;
                return;
            }
        }
    });
    if (vcodeIsWrong == true) {
        return false;
    }
    $('#spn_pop_vcode_ok').html('');
    $('#spn_pop_vcode_ok').attr('class', 'icon_yes');
    $('#spn_pop_vcode_ok').css({ 'display': '' });
    checkpop_vcode = true;
    return true;
}

function CheckdoPopSubmit(e) {
    var ev = window.event || e;
    if (ev.keyCode == 13) {
        pop_mobilephone_check();
    }
}

function pop_reg_submit(buttonname) {
    if (buttonname == "popregbutton") {
        return true;
    } else {
        return false;
    }
}

function pop_mobilephone_check() {
    var pop_sms_vcode = $('#txt_pop_sms_vcode').val();
    var pop_vcode = "";
    if ($('#popImgVcode').length > 0) {
        pop_vcode = $('#txt_pop_vcode').val();
    } else {
        pop_vcode = "1111";
    }
    if ($.trim(pop_sms_vcode) == "" || $.trim(pop_vcode) == "") {
        if ($.trim(pop_sms_vcode) == "") {
            $('#txt_pop_sms_vcode').attr('class', 'text wrong').css('border-color', '');
            $('#spn_pop_sms_vcode_ok').hide();
            $('#p_pop_sms_vcode_wrong').attr('class', 'hint cue').html(msg[22]);
        }
        if ($.trim(pop_vcode) == "") {
            $('#txt_pop_vcode').attr('class', 'text wrong').css('border-color', '');
            $('#spn_pop_vcode_ok').hide();
            $('#p_pop_vcode_wrong').attr('class', 'cue').html(msg[20]).css({ 'display': '' });
        }
        return false;
    }
    if (pop_vcode_check() && pop_sms_vcode_check()) {
        var smsvcodeIsWrong = false;
        $.ajax({
            type: 'POST',
            url: 'p/smsvcode_check.aspx',
            data: 'smsvcode=' + pop_sms_vcode + "&mphone=" + $('#hdn_username').val() + "&type_flg=reg",
            async: false,
            success: function (flg) {
                if (flg == 'false') {
                    $('#txt_pop_sms_vcode').attr('class', 'text wrong').css('border-color', '');
                    $('#spn_pop_sms_vcode_ok').hide();
                    $('#p_pop_sms_vcode_wrong').addClass('cue').html(msg[15]);
                    smsvcodeIsWrong = true;
                    return;
                }
            }
        });
        if (smsvcodeIsWrong == true) {
            return false;
        }

        $("#register_form")[0].onsubmit = function () { return pop_reg_submit("popregbutton"); }
        $('#btn_pop_submit').click();
        return true;
    }
    return false;
}