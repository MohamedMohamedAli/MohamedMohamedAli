		function esitoNo() {
		    document.getElementById("esito").innerHTML = "";
		    document.getElementById("errore").innerHTML = "";
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


		function prendiRegione() {
		    var datiRegione = $("#regioneId").val().split("(?@)");
		    regione["codice"] = datiRegione[0];
		    regione["descrizione"] = datiRegione[1];
		    provincia = { codice: "", descrizione: "" };
		    comune = { codice: "", descrizione: "" };
		    svuotaSelect("provinciaId");
		    svuotaSelect("comuneId");
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
		            setTimeout(function() { caricamento("testoProvincia", "Provincia:", false); }, 500);
		            for (var i = 0; i < data.length; i++) {
		                $("#provinciaId").append('<option value="' + data[i].codice + '(?@)' + data[i].descrizione + '">' + data[i].descrizione + '</option>');
		            }
		        },
		        error: function() {
		            setTimeout(function() { caricamento("testoProvincia", "Provincia:", false); }, 500);
		        }
		    });
		    document.getElementById("provinciaId").disabled = false;

		}


		function prendiProvincia() {
		    var datiProvincia = $("#provinciaId").val().split("(?@)");
		    provincia["codice"] = datiProvincia[0];
		    provincia["descrizione"] = datiProvincia[1];
		    comune = { codice: "", descrizione: "" };
		    svuotaSelect("comuneId");
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
		            setTimeout(function() { caricamento("testoComune", "Comune:", false) }, 500);
		            for (var i = 0; i < data.length; i++) {
		                $("#comuneId").append('<option value="' + data[i].codice + '(?@)' + data[i].descrizione + '">' + data[i].descrizione + '</option>');
		            }
		        },
		        error: function() {
		            setTimeout(function() { caricamento("testoComune", "Comune:", false) }, 500);
		        }
		    });
		    document.getElementById("comuneId").disabled = false;

		}

		function prendiComune() {
		    var datiComune = $("#comuneId").val().split("(?@)");
		    comune["codice"] = datiComune[0];
		    comune["descrizione"] = datiComune[1];

		}

		$(document).ready(function() {
		    regione = { codice: "", descrizione: "" };
		    provincia = { codice: "", descrizione: "" };
		    comune = { codice: "", descrizione: "" };
		    $.ajax({
		        url: "http://212.237.32.76:3000/geo/regioni",
		        type: "GET",
		        contentType: "application/json",
		        dataType: "json",
		        success: function(data, status, xhr) {
		            for (var i = 0; i < data.length; i++) {
		                $("#regioneId").append('<option value="' + data[i].codice + '(?@)' + data[i].descrizione + '">' + data[i].descrizione + '</option>');
		            }
		        }
		    });
		    $.ajax({
		        url: "http://212.237.32.76:3000/settore",
		        type: "GET",
		        contentType: "application/json",
		        dataType: "json",
		        success: function(data, status, xhr) {
		            for (var i = 0; i < data.length; i++) {
		                $("#settoreId").append('<option value="' + data[i].codice + '(?@)' + data[i].descrizione + '">' + data[i].descrizione + '</option>');
		            }
		        }
		    });
		});


		$("#invia").click(function() {
		    var insert = {};
		    var settore = {};
		    var settoreDati = $("#settoreId").val().split("(?@)");

		    settore["codice"] = settoreDati[0];
		    settore["descrizione"] = settoreDati[1];
		    insert["nome"] = $("#nomeId").val();
		    insert["cognome"] = $("#cognomeId").val();
		    insert["stipendioRAL"] = $("#stipendioId").val();
		    insert["dataNascita"] = $("#dataId").val();
		    insert["settore"] = settore;
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
		    caricamento("testoButton", "Attendere", true, '<img src="img/myGif/buttomLoading2.gif"/>');
		    $.ajax({
		        url: "http://212.237.32.76:3000/risorsa",
		        type: "POST",
		        contentType: "application/json",
		        dataType: "json",
		        data: JSON.stringify(insert),
		        success: function(data, status, xhr) {
		            setTimeout(function() {
		                caricamento("testoButton", "Conferma", false);
		                document.getElementById("esito").innerHTML = "Inserimento Avvenuto Con Successo.";
		            }, 500);

		            console.log("data: " + data);
		        },
		        error: function() {
		            console.log("errore");
		            setTimeout(function() {
		                caricamento("testoButton", "Conferma", false);
		                document.getElementById("errore").innerHTML = "Dati Inseriti Non Validi";
		            }, 500);

		        }
		    });
		});