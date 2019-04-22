jQuery(document).ready(function()
{
	
			
	jQuery("#sb-search").click(function()
	{
		$("html, body").animate({ scrollTop: 0 }, "slow");
		jQuery("#SearchLittle").toggle( "slow", function() 
		{
			    // Animation complete.
		});
		 
	});
	
	
	
	jQuery(window).resize(function()
	{
		
		SearchLittlewindowWidth = jQuery(window).width();
		
		if(SearchLittlewindowWidth>=768)
		{
			jQuery("#SearchLittle").hide();
		}
		
	});
	
});