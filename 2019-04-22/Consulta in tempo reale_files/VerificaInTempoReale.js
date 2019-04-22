$(window).load(function()
{


	//AUTOCOMPLETE PER PA


		//AUTOCOMPLETE
		var autocompleteUrl = jQuery("#amministrazioniAutoCompleteUrl").val();

		jQuery("#PAToCheck").autocomplete({
			delay: 1000,
			source: function( request, response ) {



				jQuery.ajax( {
					url: autocompleteUrl,

					dataType: "json",
					data: {
						term: request.term
					},
					success: function( data ) {
						//
						//console.log("DATA IN ARRIVOT");
						//onsole.log(data);
						jQuery("#PaToCheckLoading").addClass("hidden");
						var array_data = data['0'];
						//console.log("Array dati ");
						//console.log(array_data);

						//console.log("getautocomplete data ");
						var getAutocompleteData =array_data.GetAutocompleteResult;



						if(jQuery.isEmptyObject(getAutocompleteData))
						{
							//alert(getAutocompleteData.Amministrazioni.length);
							var data_read = new Array();
							var no_result = {};
							//no_result.Denominazione="La ricerca non ha prodotto risultati";
							//no_result.UrlAmministrazione="-1";
							//data_read.push(no_result);
							/*
							response( $.map( data_read, function ( item ) {
								return {
									label: item.Denominazione,
									value: item.Url,
									err: 'y'
								};
							}));
							*/

							jQuery("#VRAmmiSeaErr").removeClass("hidden");

							return;
						}





						//console.log(getAutocompleteData);

						var Amministrazioni = getAutocompleteData.Amministrazioni;

						//console.log("Amminsitrazoine data ");
						//console.log(Amministrazioni);

						if(Amministrazioni.length>=1)
						{
							var data_read = Amministrazioni;
						}
						else
						{
							var data_read = new Array();
							data_read.push(Amministrazioni);
						}

						if(data_read.length>10)
						{
							data_read = data_read.slice(0, 10);
							var punt = {}
							punt.Denominazione="...";
							punt.Url="...";
							punt.err="n";
							data_read.push(punt);
							//console.log(data_read);
						}

						response( $.map( data_read, function ( item ) {
							return {
								label: item.Denominazione,
								value: item.Url,
								err: 'n'
							};
						}));



					}
				} );
			},
			minLength: 2,
			select: function( event, ui ) {

				if(ui.item.err=="y")
				{
					return false;
				}
				if(ui.item.label=="...")
				{
					return false;
				}

				if(!CheckValidUrl(ui.item.value))
				{
					jQuery("#VRAmmiInvalidUrlErr").removeClass("hidden");
					jQuery("#VRAmmiInvalidUrlSegn").text(ui.item.value);
					jQuery("#UrlToCheck").val("");

					return false;
				}
				else
				{
					jQuery("#PAToCheck").val(ui.item.label);
					jQuery("#UrlToCheck").val(ui.item.value);
				}


				return false;
			},
			focus: function( event, ui ) {

				if(ui.item.err=="y")
				{
					return false;
				}
				if(ui.item.label=="...")
				{
					return false;
				}

				if(!CheckValidUrl(ui.item.value))
				{

				}
				else
				{
					jQuery("#PAToCheck").val(ui.item.label);
					jQuery("#UrlToCheck").val(ui.item.value);
				}
				return false;
			}

		} );


		jQuery("#PAToCheck").on("keydown", function(event,ui) {
			jQuery("#VRAmmiSeaErr").addClass("hidden");
			jQuery("#VRAmmiInvalidUrlErr").addClass("hidden");
			jQuery("#PaToCheckLoading").removeClass("hidden");
		});


















jQuery("#CheckUrlButton").click(function()
	{

		//jQuery(".tableContainerVtmr").addClass("hidden");

			if(jQuery("#UrlToCheck").val().length<2)
			{
				jQuery("#UrlToCheckError").removeClass("hidden");
				return false;
			}




			var tipo_amministrazione = jQuery("#tipologiaAmministrazioneSelect").val();
			var urlToCheck = jQuery("#UrlToCheck").val();

			VITR_checkUrl(tipo_amministrazione,urlToCheck);







	})


	if(jQuery("#UrlToCheckExists").val()=="y")
	{
		VITR_checkUrl(1,jQuery("#UrlToCheck").val());
	}



});


function VITR_checkUrl(tipo_amministrazione,urlToCheck)
{

	jQuery("#UrlToCheckLoading").removeClass("hidden");

	jQuery(".tableContainerVtmr").addClass("hidden");

	jQuery("html,body").animate({
		scrollTop: jQuery("#CheckUrlButton").position().top
	}, 1000);



	var url = jQuery("#getVerificaInTempoRealeUrl").val();
	url+="&tx_bussola_showcrawler[tipo_amministrazione]=1";
	url+="&tx_bussola_showcrawler[urlToCheck]=" + urlToCheck;


	if(jQuery.cookieBar('cookies'))
	{

		if ( (jQuery("#PAToCheck").val() !== undefined)&&(jQuery("#PAToCheck").val()!="") ) {
			titleOrdAddress = jQuery("#PAToCheck").val();
		} else {
			titleOrdAddress = jQuery("#UrlToCheck").val();
		}

		ga('set', { page: "consulta_sito/"+titleOrdAddress+"", title: titleOrdAddress });
		ga('send', 'pageview');



	}





	jQuery.getJSON(url, function(jsonData)
	{


		jQuery("#UrlToCheckError").addClass("hidden");
		jQuery("#UrlToCheckLoading").addClass("hidden");

		if(jsonData.error==1)
		{
			jQuery("#UrlToCheckError").removeClass("hidden");
		}
		else
		{
			jQuery(".tableContainerVtmr").removeClass("hidden");


			VITR_fillTables(jsonData);




		}
	});
}


function VITR_fillTables(jsonData)
{




	//ELABORO DATA

	var dataSet = jsonData;

	var dataSet_1 = [];

	jQuery.each(jsonData, function(i, data)
	{
		if( (data.gruppo!="civit")&&(data.gruppo!="altri")&&(data.gruppo!="dlgs2016") )
		{
			switch (data.IdIndicatore)
			{
				case 260:
				case 502:
				case 267:
					break;
				case 208:

					switch (data.TipologiaAmministrazione)
					{
						case 29:
						case 44:

							dataSet_1.push(data);

						break;

					}

				break
				default:
					dataSet_1.push(data);
					break;
			}



		}

	});


	var dataSet_SSN = [];

	jQuery.each(jsonData, function(i, data)
	{
		switch (data.IdIndicatore)
		{
			case 260:
			case 502:
			case 267:
				dataSet_SSN.push(data);
			break;
		}


	});



	var dataSetAltri = [];


	jQuery.each(jsonData, function(i, data)
	{
		if(data.gruppo=="altri")
		{
			dataSetAltri.push(data);

		}

	});

	var dataSetdlgs2016 = [];


	jQuery.each(jsonData, function(i, data)
	{
		if(data.gruppo=="dlgs2016")
		{
			dataSetdlgs2016.push(data);

		}

	});


	//POPOLO TABELLE

	VITR_SetTable(dataSet_1,'#Tabella-Indicatori-Riordino-Trasparenza');

	VITR_SetTable(dataSet_SSN,'#Tabella-Indicatori-Riordino-Trasparenza-SSN');

	VITR_SetTable(dataSetAltri,'#Tabella-Altri');
	VITR_SetTable(dataSetdlgs2016,'#Tabella-dlgs2016');

}


function VITR_SetTable(dataSet,table)
{
	var table_string = table;
	iTable=0;
	//var table = jQuery(table).DataTable();
	//var table_vv = jQuery(table).DataTable();

	//clear datatable
	//table_vv.clear().draw();

	//destroy datatable
	//table_vv.destroy();


	var table_vv = jQuery(table).DataTable({
		destroy : true,
		"oLanguage":dataTablesLabels(),
		data:dataSet,
		bFilter: false,
		ordering: false,
		bPaginate: false,
		columnDefs: [

			{
				"targets": 1,
				"className": 'text-left'
			},
			{
				"targets": [ 0 ],
				"visible": false,
				"searchable": false
			},
			{
				"targets": [0,2,3,4,5,6],
				"className": 'text-center'
			},
			{ "width": "12%", "targets": 6 }
		],

		"columns": [

			{ "data": "Number",

				"render":function(data, type, full, meta)
				{
					iTable++;
					return iTable;
				}
			},
			{ "data": "Indicatore" },
			{ "data": "Livello" },
			{ "data": "Esito",

				"render":function(data, type, full, meta)
				{

					return dataTablesCreateEsito(full.Esito);
				}
			},

			{ "data": "Pagina_origine",

				"render":function(data, type, full, meta)
				{
					return dataTablesCreateLink(full.Link);
				}
			},
			{ "data": "Pagina_risultato",

				"render":function(data, type, full, meta)
				{
					return dataTablesCreateLink(full.Linkresult);
				}
			},


			{ "data": "Help",

				"render":function(data, type, full, meta)
				{
					var htmlFinale = dataTablesCreateGuida(full.Help);
					htmlFinale+= dataTablesCreateSuggerimenti(full.Suggerimenti,full.Esito);
					return htmlFinale;
				}
			},





		],
		"drawCallback": function( settings ) {
			jQuery('[data-toggle="popover"]').popover({html: true, container: 'body',trigger: 'click'});


			getResultIframe(table+' a.ResultLinks');

			jQuery("#ExportIndicatoriTrasparenza").unbind();

			var urlToCheck = jQuery("#UrlToCheck").val();
			var url = jQuery("#getVerificaInTempoRealeUrl").val();
			url+="&tx_bussola_showcrawler[tipo_amministrazione]=1";
			url+="&tx_bussola_showcrawler[urlToCheck]=" + urlToCheck;
			url+="&csvFromSiteTable=y";

			jQuery("#ExportIndicatoriTrasparenza").click(function(e)
			{
				e.preventDefault();
				var gruppoin = jQuery(this).attr("id");
				url+="&csv=y&gruppo=" + gruppoin;
				window.location.href=url;

			});

			jQuery("#ExportIndicatoriTrasparenzaSSN").click(function(e)
			{
				e.preventDefault();
				var gruppoin = jQuery(this).attr("id");
				url+="&csv=y&gruppo=" + gruppoin;
				window.location.href=url;

			});

			jQuery("#ExportIndicatoriOiv").click(function(e)
			{
				e.preventDefault();
				var gruppoin = jQuery(this).attr("id");
				url+="&csv=y&gruppo=" + gruppoin;
				window.location.href=url;

			});

			jQuery("#ExportIndicatoriAltri").click(function(e)
			{
				e.preventDefault();
				var gruppoin = jQuery(this).attr("id");
				url+="&csv=y&gruppo=" + gruppoin;
				window.location.href=url;

			});

			jQuery("#ExportIndicatori2016").click(function(e)
			{
				e.preventDefault();
				var gruppoin = jQuery(this).attr("id");
				url+="&csv=y&gruppo=" + gruppoin;
				window.location.href=url;

			});




			jQuery(".dataTables_info").remove();




		}

	});


	var esiti_true=0;

	table_vv.column(3).data().each( function ( value, index )
	{

		if(value)
		{
			esiti_true++;

		}
		//console.log( 'Data in index: '+index+' is: '+value );
	});

	jQuery(table_string+"-ind_sod").text(esiti_true);
	jQuery(table_string+"-ind_tot").text(dataSet.length);


}

