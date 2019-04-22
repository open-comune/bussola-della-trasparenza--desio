function ELTO_removeOptionsFromSelect(select)
{
	jQuery(select+' option').each(function()
	{
		if ( jQuery(this).val() != '-1' )
		{
			jQuery(this).remove();
		}
	});
}

function dataTablesCreateSuggerimenti(value,esito)
{
	if(!esito)
	{
		value = value.replace(/\"/g,'&quot;');
		var string = '<a class="text-center" href="javascript://" data-placement="bottom"';
		string+='title="" data-toggle="popover" data-trigger="focus"';
		string+='data-content="'+value+'" data-original-title="Suggerimento">';
		string+='<i class="fa fa-commenting-o" aria-hidden="true"></i></a>';

		return string;
	}
	else {
		return '';
	}

}

function dataTablesCreateValutaSezioni(full)
{



	if(jQuery("#SocialsInfoConnected").val()=="y")
	{

		var string = '';
		string+='<i class="fa fa-thumbs-o-up" aria-hidden="true"></i></a>';
		string+='<i class="fa fa-thumbs-o-down" aria-hidden="true"></i></a>';

		return string;
	}
	else
	{
		var string = '';
		string+='<i class="fa fa-thumbs-o-up" aria-hidden="true"></i></a>';
		string+='<i class="fa fa-thumbs-o-down" aria-hidden="true"></i></a>';

		return string;
	}

}

function dataTablesCreateEsito(value)
{
	if(value==true)
	{
		return '<i class="fa fa-smile-o" aria-hidden="true"></i>';
	}
	else {
		return '<i class="fa fa-frown-o" aria-hidden="true"></i>';

	}
}

function dataTablesCreateLink(value)
{



	if(value)
	{

		if (!/^(f|ht)tps?:\/\//i.test(value)) {
			value = "http://" + value;
		}

		return '<a class="ResultLinks" target="_blank" href="'+value+'"><i class="fa fa-link" aria-hidden="true"></i></a>';
	}
	else {
		return '';
	}


}

function dataTablesCreateGuida(value)
{

	if(!value)
	{
		return '';
	}

	var html="<div class='guida_container'>";
	html+="<h4>"+value.Label+"</h4>";
	//html+="<p><span class='guida_label'>Riferimenti Normativi:</span> "+value.RiferimentiNor+"</p>";
	html+="<p><span class='guida_label'>Localizzazione:</span> "+value.Localizzazione+"</p>";
	html+="<p><span class='guida_label'>Metodologia di verifica:</span> "+value.Metodologia+"</p>";

	html+="</div>";

		var string = '<a class="text-center" href="javascript://" data-placement="bottom"';
		string+='title="" data-toggle="popover" data-trigger="focus"';
		string+='data-content="'+html+'" data-original-title="Guida">';
		string+='<i class="fa fa-info" aria-hidden="true"></i></a>';

		return string;
}

function getListTipologieAmministrazione(data)
{
	return '<option value="'+data.IdTipologia+'">'+data.Tipologia+'</option>';
}

function getListRegioneFromTipologia(data)
{

	return '<option value="'+data.Regione+'">'+data.Regione+'</option>';
}

function getListRegione(data)
{

	return '<option value="'+data.Denominazione+'">'+data.Denominazione+'</option>';
}

function getListProvincieFromRegioneIdTipologia(data)
{
	return '<option value="'+data.Provincia+'">'+data.Provincia+'</option>';
}

function getListProvincie(data)
{
	return '<option value="'+data.Provincia+'">'+data.Provincia+'</option>';
}

function getListIndicatori(data)
{
	return '<option value="'+data.IdIndicatore+'">'+data.Denominazione+'</option>';
}

function getListAmministrazioniFromProvinciaIdTipologia(data)
{
	return '<option value="'+data.IdAmministrazione+'">'+data.Denominazione+'</option>';
}

function dataTablesLabels()
{
	var labels = {
	"sSearch": "Cerca:",
			"sProcessing": "Caricamento...",
			"sLengthMenu": "Mostra _MENU_ righe per pagina",
			"sInfo": "Totale _TOTAL_ di (_START_ to _END_)",
			"oPaginate": {
		"sPrevious": "Precedenti",
				"sNext": "Successivi"
	}}

	return labels;
}

function RemoveLoginContainer()
{
	jQuery("#SocialsLogin").remove();
}

function DataMonitoraggio(date)
{
	var date_array=date.split("T");

	var date_dmy_array = date_array['0'].split("-");

	var date_formatted= date_dmy_array['2']+"/"+date_dmy_array['1']+"/"+date_dmy_array['0'];

	jQuery("#DataMonitoraggio").text(date_formatted+" alle "+date_array['1']);

	return date_formatted+" alle "+date_array['1'];

}


function getResultIframe(links)
{
	jQuery("#SiteRequestUrlResContentClose").click(function()
	{
		jQuery("#SiteRequestUrlRes").hide();
	});

	isAlreadyPressed = false;


	jQuery(links).each(function () {

		var urlAJ = jQuery("#getExternalSiteContentUrl").val()+"&url=";
		urlAJ += jQuery(this).attr("href");


		jQuery(this).click(function(e)
		{
			e.preventDefault();
			var widthWindow = jQuery(window).width();
			if(widthWindow<640)
			{
				window.open(jQuery(this).attr("href"));
				return;
			}


			if(isAlreadyPressed) return;
			isAlreadyPressed = true;


			jQuery("#SiteRequestUrlResContentLink").attr("href",jQuery(this).attr("href"));

			var topPosition = jQuery(window).scrollTop();
			jQuery("#SiteRequestUrlRes").css({ top: ''+topPosition+'px' });
			jQuery("#SiteRequestUrlRes").show();

			//jQuery("#SiteRequestUrlResContent").html('<div id="SiteRequestUrlResLoading" class="loadingGif"></div>');



			jQuery.ajax(
					{
						url: urlAJ, success: function(result)
					{
						jQuery("#SiteRequestUrlResContent").html(result);

						isAlreadyPressed = false;
					}});


		});

	});

}


function CheckValidUrl(url)
{
	url = url.toLowerCase();
if(url=="null")
{
	return false;
}


	var prefix_2 = 'http://';
	if (url.substr(0, prefix_2.length) !== prefix_2)
	{



		var prefix_1 = 'www.';
		if (url.substr(0, prefix_1.length) !== prefix_1)
		{


			url = "http://www." + url;
		}
		else
		{
			url = "http://" + url;
		}

	}



	if(isUrl(url)){

		return true;
	} else {

		return false;
	}

}

function isUrl(s) {
	var urlregex = /^(http\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

	return urlregex.test(s);
}

function RebuildValidUrl(url)
{




	var prefix_2 = 'http://';
	if (url.substr(0, prefix_2.length) !== prefix_2)
	{



		var prefix_1 = 'www.';
		if (url.substr(0, prefix_1.length) !== prefix_1)
		{


			url = "http://www." + url;
		}
		else
		{
			url = "http://" + url;
		}

	}

	return url;

}


$(document).ready(function()
{

	// $(".reveal-trigger").click(function(t){
	// 	t.preventDefault(),$(this).parent(".reveal-content").toggleClass("active")});


});
