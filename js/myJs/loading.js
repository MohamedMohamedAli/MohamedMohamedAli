//caricamento pulsante
function caricamento(id, testo, attiva, gif) {
    if (attiva) {
        if (gif == undefined) {
            document.getElementById(id).innerHTML = testo + '<img src="img/myGif/selectLoading.gif">';
        } else {
            document.getElementById(id).innerHTML = testo + gif;
        }
    } else {
        document.getElementById(id).innerHTML = testo;
    }
}


//caricamento cambio pagina
! function(d) {
    d.fakeLoader = function(i) {
        var s = d.extend({
                targetClass: "fakeLoader",
                bgColor: "#3498db",
                spinner: "spinner3"
            },
            i);
        e = d("body").find("." + s.targetClass);
        e.each(function() {
                e.html('<div class="fl fl-spinner spinner3"><div class="dot1"></div><div class="dot2"></div></div>');
            }),
            e.css({ backgroundColor: s.bgColor }), setTimeout(function() { d(e).fadeOut() }, s.timeToHide)
    }
}(jQuery);

$(document).ready(function() {
    $("#fakeLoader").addClass("fakeLoader");
    $.fakeLoader({
        bgColor: "#3498db",
        spinner: "spinner3"
    });
});


function caricamentoCambioPagina(attiva, n) {
    if (attiva) {
        if (n == undefined) {
            $("#fakeLoader").show();
        } else {
            $("#fakeLoader").fadeIn(n);
        }
    } else {
        if (n == undefined) {
            $("#fakeLoader").fadeOut(2000);
        } else {
            $("#fakeLoader").fadeOut(n);
        }
    }
}