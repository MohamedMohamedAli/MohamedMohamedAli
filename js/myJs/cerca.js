		$(document).ready(function() {

		    document.getElementById("tabella").style.display = "none";
		    document.getElementById("indietro").style.display = "none";
		    $.ajax({
		        url: "http://212.237.32.76:3000/settore",
		        type: "GET",
		        contentType: "application/json",
		        dataType: "json",
		        success: function(data, status, xhr) {
		            for (var i = 0; i < data.length; i++) {
		                $("#codiceSettoreId").append("<option value='" + data[i].codice + "'>" + data[i].descrizione + "</option>");
		            }
		        }
		    });
		});

		$("#invia").click(function() {
		    var nome = document.getElementById("nomeId").value;
		    var cognome = document.getElementById("cognomeId").value;
		    var codiceSettore = document.getElementById("codiceSettoreId").value;
		    caricamento("testoButton", "Attendere", true, '<img src="img/myGif/buttomLoading2.gif"/>');
		    caricamentoCambioPagina(true, 250);
		    $.ajax({
		        url: "http://212.237.32.76:3000/risorsa?nome=" + nome + "&cognome=" + cognome + "&codiceSettore=" + codiceSettore,
		        type: "GET",
		        contentType: "application/json",
		        dataType: "json",
		        success: function(data, status, xhr) {
		            setTimeout(function() {
		                caricamento("testoButton", "Avvia Ricerca", false);
		                costruisciTabella(data);
		                caricamentoCambioPagina(false, 250);
		            }, 250);
		            risultato = data;

		        },
		        error: function() {
		            console.log("errore");
		            setTimeout(function() {
		                caricamento("testoButton", "Avvia Ricerca", false);
		                alert("dati inseriti non validi");
		            }, 1000);

		        }
		    });
		});

		function costruisciTabella(data) {
		    document.getElementById("titolo").innerHTML = "Esito Ricerca:";
		    dati = document.getElementById("datiID");
		    indietro = document.getElementById("indietro");
		    tabella = document.getElementById("tabella");

		    dati.style.display = "none";
		    indietro.style.display = "block";
		    tabella.style.display = "block";
		    for (var i = 0; i < data.length; i++) {
		        console.log("id: " + data[i]._id + "  -  nome: " + data[i].nome);
		        var row = tabella.insertRow();
		        var cell1 = row.insertCell();
		        var cell2 = row.insertCell();
		        var cell3 = row.insertCell();
		        var cell4 = row.insertCell();
		        var cell5 = row.insertCell();
		        cell1.innerHTML = data[i].nome;
		        cell2.innerHTML = data[i].cognome;
		        if (data[i].settore != null) {
		            cell3.innerHTML = data[i].settore.descrizione;
		        } else {
		            cell3.style.color = "red";
		            cell3.innerHTML = "Non Inserito";
		        }
		        cell4.innerHTML = data[i].stipendioRAL;
		        if (data[i].residenza != null) {
		            cell5.innerHTML = data[i].residenza.regione.descrizione + "," + data[i].residenza.provincia.descrizione + "," + data[i].residenza.comune.descrizione;
		        } else {
		            cell5.style.color = "red";
		            cell5.innerHTML = "Non Inserita";
		        }
		    }
		}

		function svuotaTabella() {
		    for (var i = 0; i < risultato.length; i++) {
		        tabella.deleteRow(-1);
		    }
		}

		$("#indietro").click(function() {
		    caricamentoCambioPagina(true, 250);
		    setTimeout(function() {
		        caricamentoCambioPagina(false, 250);
		        svuotaTabella();
		        document.getElementById("titolo").innerHTML = "Ricerca Risorsa:";
		        tabella.style.display = "none";
		        indietro.style.display = "none";
		        dati.style.display = "block";
		    }, 250);

		});