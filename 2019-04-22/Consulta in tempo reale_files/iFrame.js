

function checkFrameIframeDelfjke()
{
	jQuery("#SiteRequestBlankpage").remove();
	jQuery("#SiteRequestUrlRes").append('<div id="SiteRequestBlankpage">Se il sito non si visualizza non è possibile ottenere un\'anteprima</div>');

	setTimeout(overBackIframeDelfjke,3000);

	}

function overBackIframeDelfjke() {
	$("#iFrameContainer").css("background-image", "url('typo3conf/ext/bussola/Resources/Public/Images/BackOver.png'");

}