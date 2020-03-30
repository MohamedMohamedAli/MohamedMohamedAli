		function esitoNo() {
		    document.getElementById("esito").innerHTML = "";
		}
		$(document).ready(function() {
		    console.log("start");
		    document.getElementById("indietro").style.display = "none";
		});


		function mostraDati(mostra) {

		    if (mostra) {
		        document.getElementById("datiID").style.display = "none";
		        document.getElementById("indietro").style.display = "block";


		        document.getElementById("nome").innerHTML = "NOME: <span style=\"font-family:courier; color:darkgreen\">" + result.nome + "</span>";

		        document.getElementById("cognome").innerHTML = "COGNOME: <span style=\"font-family:courier; color:darkgreen\">" + result.cognome + "</span>";

		        document.getElementById("data").innerHTML = "DATA DI NASCITA: <span style=\"font-family:courier; color:darkgreen\">" + result.dataNascita + "</span>";

		        document.getElementById("stipendio").innerHTML = "STIPENDIO: <span style=\"font-family:courier; color:darkgreen\">" + result.stipendioRAL + "</span>";
		        if (result.settore != null) {
		            document.getElementById("settore").innerHTML = "SETTORE: <span style=\"font-family:courier; color:darkgreen\">" + result.settore.descrizione + "</span>";
		        }
		        if (result.residenza != null) {
		            document.getElementById("regione").innerHTML = "REGIONE: <span style=\"font-family:courier; color:darkgreen\">" + result.residenza.regione.descrizione + "</span>";

		            document.getElementById("provincia").innerHTML = "PROVINCIA: <span style=\"font-family:courier; color:darkgreen\">" + result.residenza.provincia.descrizione + "</span>";

		            document.getElementById("comune").innerHTML = "COMUNE: <span style=\"font-family:courier; color:darkgreen\">" + result.residenza.comune.descrizione + "</span>";
		        }
		    } else {
		        caricamentoCambioPagina(true, 250);
		        setTimeout(function() {
		            caricamentoCambioPagina(false, 250);
		            document.getElementById("datiID").style.display = "block";
		            document.getElementById("indietro").style.display = "none";

		            document.getElementById("nome").innerHTML = "";

		            document.getElementById("cognome").innerHTML = "";

		            document.getElementById("data").innerHTML = "";

		            document.getElementById("stipendio").innerHTML = "";

		            document.getElementById("settore").innerHTML = "";

		            document.getElementById("regione").innerHTML = "";

		            document.getElementById("provincia").innerHTML = "";

		            document.getElementById("comune").innerHTML = "";
		        }, 250);

		    }
		}

		$("#invia").click(function() {
		    var id = document.getElementById("id").value;
		    console.log(id.length);
		    console.log("id: " + id);
		    if (id.length != 24) {
		        document.getElementById("esito").innerHTML = "ID Inesistente";
		        return;
		    }
		    caricamento("testoButton", "Attendere", true, '<img src="img/myGif/buttomLoading2.gif"/>');
		    console.log("id: " + id)
		    $.ajax({
		        url: "http://212.237.32.76:3000/risorsa/" + id,
		        type: "GET",
		        contentType: "application/json",
		        dataType: "json",
		        success: function(data, status, xhr) {
		            caricamentoCambioPagina(true, 250);
		            setTimeout(function() {
		                mostraDati(true);
		                caricamentoCambioPagina(false, 250);
		            }, 250);

		            caricamento("testoButton", "Dettaglio", false);
		            result = data;

		        },
		        error: function() {
		            setTimeout(function() {
		                caricamento("testoButton", "Dettaglio", false);
		                console.log("errore");
		                document.getElementById("esito").innerHTML = "ID Inesistente";
		            }, 1000);

		        }
		    });
		});