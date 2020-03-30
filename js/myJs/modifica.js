		function esitoNo() {
		    document.getElementById("esito").innerHTML = "";
		    document.getElementById("errore").innerHTML = "";
		}


		$(document).ready(function() {
		    console.log("start");
		    document.getElementById("datiModifica").style.display = "none";
		    $.ajax({
		        url: "http://212.237.32.76:3000/settore",
		        type: "GET",
		        contentType: "application/json",
		        dataType: "json",
		        success: function(data, status, xhr) {
		            dataSettore = data;
		            for (var i = 0; i < data.length; i++) {
		                $("#settoreId").append("<option value='" + JSON.stringify(data[i]) + "'>" + data[i].descrizione + "</option>");
		            }
		        }
		    });
		    $.ajax({
		        url: "http://212.237.32.76:3000/geo/regioni",
		        type: "GET",
		        contentType: "application/json",
		        dataType: "json",
		        success: function(data, status, xhr) {
		            dataRegioni = data;
		            for (var i = 0; i < data.length; i++) {
		                $("#regioneId").append('<option value="' + data[i].codice + '(?@)' + data[i].descrizione + '">' + data[i].descrizione + '</option>');
		            }
		        }
		    });
		});

		$("#carica").click(function() {
		    var id = document.getElementById("id").value;
		    if (id.length != 24) {
		        document.getElementById("errore").innerHTML = "ID Inesistente";
		        return;
		    }
		    caricamento("testoButton", "Attendere", true, '<img src="img/myGif/buttomLoading2.gif"/>');
		    $.ajax({
		        url: "http://212.237.32.76:3000/risorsa/" + id,
		        type: "GET",
		        contentType: "application/json",
		        dataType: "json",
		        success: function(data, status, xhr) {
		            caricamentoCambioPagina(true, 250);
		            setTimeout(function() {
		                caricamentoCambioPagina(false, 250);
		                compila();
		            }, 250)

		            caricamento("testoButton", "Modifica", false);
		            result = data;

		        },
		        error: function() {
		            setTimeout(function() {
		                caricamento("testoButton", "Modifica", false);
		                console.log("errore");
		                document.getElementById("errore").innerHTML = "ID Inesistente";
		            }, 1000);

		        }
		    });
		});


		function prendiRegione() {

		    var datiRegione = $("#regioneId").val().split("(?@)");
		    console.log("regione: " + datiRegione);
		    regione = {};
		    regione["codice"] = datiRegione[0];
		    regione["descrizione"] = datiRegione[1];
		    svuotaSelect("provinciaId");
		    svuotaSelect("comuneId");
		    provincia = { codice: "", descrizione: "" };
		    comune = { codice: "", descrizione: "" };
		    document.getElementById("provinciaId").disabled = true;
		    document.getElementById("comuneId").disabled = true;
		    if (datiRegione[0] == "") {
		        return;
		    }
		    caricamento("testoProvincia", "Provincia:", true);
		    $.ajax({
		        url: "http://212.237.32.76:3000/geo/province/" + regione["codice"],
		        type: "GET",
		        contentType: "application/json",
		        dataType: "json",
		        success: function(data, status, xhr) {
		            dataProvince = data;
		            setTimeout(function() { caricamento("testoProvincia", "Provincia:", false); }, 500);
		            for (var i = 0; i < data.length; i++) {
		                $("#provinciaId").append('<option value="' + data[i].codice + '(?@)' + data[i].descrizione + '">' + data[i].descrizione + '</option>');
		                if (data[i].codice == result.residenza.provincia.codice) {
		                    document.getElementById("provinciaId").selectedIndex = "" + (i + 1);
		                    prendiProvincia();
		                }
		            }
		        }
		    });
		    document.getElementById("provinciaId").disabled = false;

		}


		function prendiProvincia() {
		    var datiProvincia = $("#provinciaId").val().split("(?@)");
		    console.log("provincia: " + datiProvincia);
		    provincia = {};
		    provincia["codice"] = datiProvincia[0];
		    provincia["descrizione"] = datiProvincia[1];
		    svuotaSelect("comuneId");
		    comune = { codice: "", descrizione: "" };
		    document.getElementById("comuneId").disabled = true;
		    if (datiProvincia[0] == "") {
		        return;
		    }
		    caricamento("testoComune", "Comune:", true);
		    $.ajax({
		        url: "http://212.237.32.76:3000/geo/comuni/" + provincia["codice"],
		        type: "GET",
		        contentType: "application/json",
		        dataType: "json",
		        success: function(data, status, xhr) {
		            setTimeout(function() { caricamento("testoComune", "Comune:", false); }, 500);
		            for (var i = 0; i < data.length; i++) {
		                $("#comuneId").append('<option value="' + data[i].codice + '(?@)' + data[i].descrizione + '">' + data[i].descrizione + '</option>');
		                if (data[i].codice == result.residenza.comune.codice) {
		                    document.getElementById("comuneId").selectedIndex = "" + (i + 1);
		                    prendiComune();
		                }
		            }
		        }
		    });
		    document.getElementById("comuneId").disabled = false;

		}

		function prendiComune() {
		    var datiComune = $("#comuneId").val().split("(?@)");
		    comune = {};
		    comune["codice"] = datiComune[0];
		    comune["descrizione"] = datiComune[1];

		}

		$("#invia").click(function() {
		    var insert = {};
		    var settore = JSON.parse($("#settoreId").val());
		    console.log("json codice:" + settore["codice"]);
		    console.log("json codice:" + settore);
		    insert["nome"] = $("#nomeId").val();
		    insert["cognome"] = $("#cognomeId").val();
		    insert["stipendioRAL"] = $("#stipendioId").val();
		    insert["dataNascita"] = $("#dataId").val();
		    insert["settore"] = settore;
		    insert["_id"] = $("#id").val();
		    insert["residenza"] = { regione: regione, provincia: provincia, comune: comune };
		    console.log("codice[reg]: " + insert.residenza.regione.codice);
		    console.log("descrizione[reg]: " + insert.residenza.regione.descrizione);
		    console.log("codice[prov]: " + insert.residenza.provincia.codice);
		    console.log("descrizione[prov]: " + insert.residenza.provincia.descrizione);
		    console.log("codice[com]: " + insert.residenza.comune.codice);
		    console.log("descrizione[com]: " + insert.residenza.comune.descrizione);
		    if (insert["nome"] == "") {
		        alert("Compila Il Campo Nome");
		        return;
		    }
		    if (insert["cognome"] == "") {
		        alert("Compila Il Campo Cognome");
		        return;
		    }
		    if (insert["stipendioRAL"] == "") {
		        alert("Compila Il Campo Stipendio");
		        return;
		    }
		    if (insert["dataNascita"] == "") {
		        alert("Inserisci la Data Di Nascita");
		        return;
		    }
		    if (settore["codice"] == "") {
		        alert("Seleziona Un Settore");
		        return;
		    }
		    if (comune["codice"] == "") {
		        alert("Seleziona Un Comune");
		        return;
		    }
		    caricamento("testoButtonInvia", "Attendere", true, '<img src="img/myGif/buttomLoading2.gif"/>');
		    $.ajax({
		        url: "http://212.237.32.76:3000/risorsa",
		        type: "PUT",
		        contentType: "application/json",
		        dataType: "json",
		        data: JSON.stringify(insert),
		        success: function(data, status, xhr) {
		            caricamento("testoButtonInvia", "Conferma", false);
		            document.getElementById("esito").innerHTML = "Modifica Avvenuta Con Successo.";
		            svuota();
		        },
		        error: function() {
		            setTimeout(function() {
		                caricamento("testoButtonInvia", "Conferma", false);
		                document.getElementById("errore").innerHTML = "Dati Inseriti Non Validi";
		            }, 500);
		            console.log("errore");
		        }
		    });
		});


		function compila() {
		    document.getElementById("datiID").style.display = "none";
		    document.getElementById("datiModifica").style.display = "block";

		    $("#nomeId").val(result.nome);
		    $("#cognomeId").val(result.cognome);
		    $("#dataId").val(result.dataNascita);
		    $("#stipendioId").val(result.stipendioRAL);
		    for (var i = 0; i < dataSettore.length; i++) {
		        if (dataSettore[i].codice == result.settore.codice) {
		            document.getElementById("settoreId").selectedIndex = "" + i;
		        }
		    }
		    for (var i = 0; i < dataRegioni.length; i++) {
		        if (dataRegioni[i].codice == result.residenza.regione.codice) {
		            document.getElementById("regioneId").selectedIndex = "" + (i + 1);
		            break;
		        }
		    }
		    console.log("regione: " + $("#regioneId").val());
		    prendiRegione();

		}


		function svuotaSelect(idSelect) {
		    var laSelect = document.getElementById(idSelect);
		    console.log("lunghezza select: " + laSelect.options.length);
		    var n = laSelect.options.length;
		    for (var i = 1; i < n; i++) {
		        laSelect.options[1] = null;
		    }
		    console.log("lunghezza select dopo C[" + idSelect + "]: " + laSelect.options.length);
		}


		function svuota() {
		    caricamentoCambioPagina(true, 250);
		    setTimeout(function() {
		        caricamentoCambioPagina(false, 250);
		        document.getElementById("datiModifica").style.display = "none";
		        document.getElementById("datiID").style.display = "block";
		    }, 250);

		}