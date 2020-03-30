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


		        document.getElementById("nome").innerHTML = "NOME: ";
		        document.getElementById("nomeInput").innerHTML = result.nome;

		        document.getElementById("cognome").innerHTML = "COGNOME: ";
		        document.getElementById("cognomeInput").innerHTML = result.cognome;

		        document.getElementById("data").innerHTML = "DATA DI NASCITA: ";
		        document.getElementById("dataInput").innerHTML = result.dataNascita;

		        document.getElementById("stipendio").innerHTML = "STIPENDIO: ";
		        document.getElementById("stipendioInput").innerHTML = result.stipendioRAL;
		        if (result.settore != null) {
		            document.getElementById("settore").innerHTML = "SETTORE: ";
		            document.getElementById("settoreInput").innerHTML = result.settore.descrizione;
		        }
		        if (result.residenza != null) {
		            document.getElementById("regione").innerHTML = "REGIONE: ";
		            document.getElementById("regioneInput").innerHTML = result.residenza.regione.descrizione;

		            document.getElementById("provincia").innerHTML = "PROVINCIA: ";
		            document.getElementById("provinciaInput").innerHTML = result.residenza.provincia.descrizione;

		            document.getElementById("comune").innerHTML = "COMUNE: ";
		            document.getElementById("comuneInput").innerHTML = result.residenza.comune.descrizione;
		        }
		    } else {
		        caricamentoCambioPagina(true, 250);
		        setTimeout(function() {
		            caricamentoCambioPagina(false, 250);
		            document.getElementById("datiID").style.display = "block";
		            document.getElementById("indietro").style.display = "none";

		            document.getElementById("nome").innerHTML = "";
		            document.getElementById("nomeInput").innerHTML = "";

		            document.getElementById("cognome").innerHTML = "";
		            document.getElementById("cognomeInput").innerHTML = "";

		            document.getElementById("data").innerHTML = "";
		            document.getElementById("dataInput").innerHTML = "";

		            document.getElementById("stipendio").innerHTML = "";
		            document.getElementById("stipendioInput").innerHTML = "";

		            document.getElementById("settore").innerHTML = "";
		            document.getElementById("settoreInput").innerHTML = "";

		            document.getElementById("regione").innerHTML = "";
		            document.getElementById("regioneInput").innerHTML = "";

		            document.getElementById("provincia").innerHTML = "";
		            document.getElementById("provinciaInput").innerHTML = "";

		            document.getElementById("comune").innerHTML = "";
		            document.getElementById("comuneInput").innerHTML = "";
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