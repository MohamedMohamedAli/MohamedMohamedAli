		function esitoNo(){
			document.getElementById("esito").innerHTML = "";
			document.getElementById("errore").innerHTML = "";
		}
		

		$("#invia").click(function(){
			var id = document.getElementById("id").value;
			console.log("id: "+id);
			if(id.length != 24){
				document.getElementById("errore").innerHTML = "ID Inesistente";
				return;
			}
			caricamento("testoButton", "Attendere", true, '<img src="img/myGif/buttomLoading2.gif"/>');
			$.ajax(
					{
					url: "http://212.237.32.76:3000/risorsa/"+id,
			        type: "DELETE",
			        contentType:"application/json",
			        dataType: "json",
			        success: function(data, status, xhr){
						setTimeout(function(){
							caricamento("testoButton", "Elimina", false);
							document.getElementById("esito").innerHTML = "Eliminazione Avvenuta Con Successo.";
						},1000);
			        },
			        error: function(){ 
						console.log("errore");
						setTimeout(function(){
							caricamento("testoButton", "Elimina", false);
							document.getElementById("errore").innerHTML = "Dati Inseriti Non Validi";
						},1000);
						
			        }
			});
		});