/*
 * This file is part of EC-CUBE
 *
 * Copyright(c) 2000-2011 LOCKON CO.,LTD. All Rights Reserved.
 *
 * http://www.lockon.co.jp/
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */
// 親�?��???��???��?��???確�??.
function fnIsopener() {
    var ua = navigator.userAgent;
    if( !!window.opener ) {
        if( ua.indexOf('MSIE 4')!=-1 && ua.indexOf('Win')!=-1 ) {
            return !window.opener.closed;
        } else {
        	return typeof window.opener.document == 'object';
        }
	} else {
		return false;
	}
}

// ?�便??????��?????��???.
//function fnCallAddress(php_url, tagname1, tagname2, input1, input2) {
//    zip1 = document.form1[tagname1].value;
//    zip2 = document.form1[tagname2].value;
//
//    if(zip1.length == 3 && zip2.length == 4) {
//        $.get(
//            php_url,
//            {zip1: zip1, zip2: zip2, input1: input1, input2: input2},
//            function(data) {
//                arrdata = data.split("|");
//                if (arrdata.length > 1) {
//                    fnPutAddress(input1, input2, arrdata[0], arrdata[1], arrdata[2]);
//                } else {
//                    alert(data);
//                }
//            }
//        );
//    } else {
//        alert("?�便???????��??????��??????��?????????");
//  }
//}

// ?�便??????��?????��???.
function fnCallAddress(php_url, tagname1, tagname2, input1, input2, input3, input4) {
    zip1 = document.form1[tagname1].value;
    zip2 = document.form1[tagname2].value;

    if(zip1.length == 3) {
        $.get(
            php_url,
            {zip1: zip1, zip2: zip2, input1: input1, input2: input2, input3: input3, input4: input4},
            function(data) {
                arrdata = data.split("|");
                if (arrdata.length > 1) {
                    fnPutAddress(input1, input2, input3, input4, arrdata[0], arrdata[1], arrdata[2]);
                } else {
                    alert(data);
                }
            }
        );
    } else {
        alert("�?��?��??????�????");
    }
}

// ?�便????????????��???????????��??.
//function fnPutAddress(input1, input2, state, city, town) {
//    if(state != "") {
//        // ??????��?��???��??????.
//        document.form1[input1].selectedIndex = state;
//        document.form1[input2].value = city + town;
//    }
//}

// ?�便????????????��???????????��??.
function fnPutAddress(input1, input2, input3, input4, state, city, town) {
    if(state != "") {
        // ??????��?��???��??????.
        document.form1[input1].selectedIndex = state;
        document.form1[input2].value = city + town;
        document.form1[input3].selectedIndex = state;
        document.form1[input4].value = city + town;
    }
}

function fnOpenNoMenu(URL) {
    window.open(URL,"nomenu","scrollbars=yes,resizable=yes,toolbar=no,location=no,directories=no,status=no");
}

function fnOpenWindow(URL,name,width,height) {
    window.open(URL,name,"width="+width+",height="+height+",scrollbars=yes,resizable=no,toolbar=no,location=no,directories=no,status=no");
}

function fnSetFocus(name) {
    if(document.form1[name]) {
        document.form1[name].focus();
    }
}

// ?��?��?��???????��?��?��??????????????��??.
function fnSetSelect(name1, name2, val) {
    sele1 = document.form1[name1];
    sele2 = document.form1[name2];

    if(sele1 && sele2) {
        index=sele1.selectedIndex;

        // ?��?��?��???????��?��?��?��?��??
        count=sele2.options.length
        for(i = count; i >= 0; i--) {
            sele2.options[i]=null;
        }

        // ?��?��?��???????��?��?��?��??????????��????
        len = lists[index].length
        for(i = 0; i < len; i++) {
            sele2.options[i]=new Option(lists[index][i], vals[index][i]);
            if(val != "" && vals[index][i] == val) {
                sele2.options[i].selected = true;
            }
        }
    }
}

// Enter?��?��?��?????��???��?��?��??????(IE?�対�?)
function fnCancelEnter()
{
    if (gCssUA.indexOf("WIN") != -1 && gCssUA.indexOf("MSIE") != -1) {
        if (window.event.keyCode == 13)
        {
            return false;
        }
    }
    return true;
}

// ?��?��???��?��?��???????????�SUBMIT????????
function fnModeSubmit(mode, keyname, keyid) {
    switch(mode) {
    case 'delete_category':
        if(!window.confirm('?��?????????��???��?��?��?��???��?��???��???��?��?��?��???��?��??????????��??')){
            return;
        }
        break;
    case 'delete':
        if(!window.confirm('�?度�????????????��?��?��?????��????��??????\n?????????��??�???????��??????')){
            return;
        }
        break;
    case 'delete_order':
        if(!window.confirm('�?度�????????????��?��?��?????��????��??????\n?????????��??�???????��??????n\n?? ??庫�??��??????��?????��????????????')){
            return;
        }
        mode = 'delete';
        break;
    case 'confirm':
        if(!window.confirm('????????��??�???????��????')){
            return;
        }
        break;
    case 'delete_all':
        if(!window.confirm('�??���????????��?��????????��??�???????��????')){
            return;
        }
        break;
    default:
        break;
    }
    document.form1['mode'].value = mode;
    if(keyname != "" && keyid != "") {
        document.form1[keyname].value = keyid;
    }
    document.form1.submit();
}

function fnFormModeSubmit(form, mode, keyname, keyid) {
    switch(mode) {
    case 'delete':
        if(!window.confirm('�?度�????????????��?��?��?????��????��??????\n?????????��??�???????��??????')){
            return;
        }
        break;
    case 'confirm':
        if(!window.confirm('????????��??�???????��????')){
            return;
        }
        break;
    case 'regist':
        if(!window.confirm('????????��??�???????��????')){
            return;
        }
        break;
    default:
        break;
    }
    document.forms[form]['mode'].value = mode;
    if(keyname != "" && keyid != "") {
        document.forms[form][keyname].value = keyid;
    }
    document.forms[form].submit();
}

function fnSetFormSubmit(form, key, val) {
    document.forms[form][key].value = val;
    document.forms[form].submit();
    return false;
}

function fnSetVal(key, val) {
    fnSetFormVal('form1', key, val);
}

function fnSetFormVal(form, key, val) {
    document.forms[form][key].value = val;
}

function fnChangeAction(url) {
    document.form1.action = url;
}

// ????��?��??????�使????????
function fnNaviPage(pageno) {
    document.form1['pageno'].value = pageno;
    document.form1.submit();
}

function fnSearchPageNavi(pageno) {
    document.form1['pageno'].value = pageno;
    document.form1['mode'].value = 'search';
    document.form1.submit();
    }

function fnSubmit(){
    document.form1.submit();
}

// ???��?��???��?????????
function fnCheckInputPoint() {
    if(document.form1['point_check']) {
        list = new Array(
                        'use_point'
                        );

        if(!document.form1['point_check'][0].checked) {
            color = "#dddddd";
            flag = true;
        } else {
            color = "";
            flag = false;
        }

        len = list.length
        for(i = 0; i < len; i++) {
            if(document.form1[list[i]]) {
                var current_color = document.form1[list[i]].style.backgroundColor;
                if (color != "#dddddd" && (current_color == "#ffe8e8" || current_color == "rgb(255, 232, 232)"))
                {
                    continue;
                }
                document.form1[list[i]].disabled = flag;
                document.form1[list[i]].style.backgroundColor = color;
            }
        }
    }
}

// ?e??��???????????��?????????
function fnCheckInputDeliv() {
    if(!document.form1) {
        return;
    }
    if(document.form1['deliv_check']) {
        list = new Array(
                        'shipping_name01',
                        'shipping_name02',
                        'shipping_kana01',
                        'shipping_kana02',
                        'shipping_pref',
                        'shipping_zip01',
                        'shipping_zip02',
                        'shipping_addr01',
                        'shipping_addr02',
                        'shipping_tel01',
                        'shipping_tel02',
                        'shipping_tel03'
                        );

        if(!document.form1['deliv_check'].checked) {
            fnChangeDisabled(list, '#dddddd');
        } else {
            fnChangeDisabled(list, '');
        }
    }
}

// ??????�設�????????��????????????????��???????
var g_savecolor = new Array();

function fnChangeDisabled(list, color) {
    len = list.length;

    for(i = 0; i < len; i++) {
        if(document.form1[list[i]]) {
            if(color == "") {
                // ?????��??????
                document.form1[list[i]].disabled = false;
                document.form1[list[i]].style.backgroundColor = g_savecolor[list[i]];
            } else {
                // ?��??��??????
                document.form1[list[i]].disabled = true;
                g_savecolor[list[i]] = document.form1[list[i]].style.backgroundColor;
                document.form1[list[i]].style.backgroundColor = color;//"#f0f0f0";
            }
        }
    }
}


// ?��?��?��?��??��?��?????��????
function fnCheckLogin(formname) {
    var lstitem = new Array();

    if(formname == 'login_mypage'){
    lstitem[0] = 'mypage_login_email';
    lstitem[1] = 'mypage_login_pass';
    }else{
    lstitem[0] = 'login_email';
    lstitem[1] = 'login_pass';
    }
    var max = lstitem.length;
    var errflg = false;
    var cnt = 0;

    //??�?????????��???��????
    for(cnt = 0; cnt < max; cnt++) {
        if(document.forms[formname][lstitem[cnt]].value == "") {
            errflg = true;
            break;
        }
    }

    // �???????????��????????��???��???????
    if(errflg == true) {
        alert('?��?��?��?��???��??/???��?��?��?????��??????��?????????');
        return false;
    }
}

// ??????��??��.
function fnPassTime(){
    end_time = new Date();
    time = end_time.getTime() - start_time.getTime();
    alert((time/1000));
}
start_time = new Date();

//親�?��???��???��?��????��?��?????????.
function fnUpdateParent(url) {
    // 親�?��???��???��?��???確�??
    if(fnIsopener()) {
        window.opener.location.href = url;
    } else {
        window.close();
    }
}

//??�???��?��?��??UBMIT????.
function fnKeySubmit(keyname, keyid) {
    if(keyname != "" && keyid != "") {
        document.form1[keyname].value = keyid;
    }
    document.form1.submit();
}

//?????????��?��?��????????
//�??1�??????��?��????��
//�??2�????????��?��?��??���?
//�??3�???��?��?��????????�?���?
function fnCharCount(form,sch,cnt) {
    document.forms[form][cnt].value= document.forms[form][sch].value.length;
}


// ???��?��???��?��?��?��?��?��?��?????????.
function ChangeSize(buttonSelector, textAreaSelector, max, min) {

    if ($(textAreaSelector).attr('rows') <= min) {
        $(textAreaSelector).attr('rows', max);
        $(buttonSelector).text('縮�??');
    } else {
        $(textAreaSelector).attr('rows', min);
        $(buttonSelector).text('???�?');
    }
}