you need to include 2 library scripts, one script with presentation and create div with id 'bionator'

1. Copy folders 'scripts' and 'assets'
2. in Index.html, before close tag </head> type this:
	<script type="text/javascript" src="scripts/jquery-2.1.4.min.js"></script>
  	<script type="text/javascript" src="scripts/phaser.min.js"></script>
  	<script type="text/javascript" src="scripts/bionator_d.js"></script>

  	bionator_d.js - must be included on page with information for doctors. Or:
  	bionator_p.js - information for patients. Or:
  	bionator_s.js - for start page.

3. in index.html after opening tag <div id="banner"> create new div with id 'bionator'.
	<div id='bionator'></div>
4. reload page.
5. profit :)


P.S. You can change text information in data.json - file (in assets folder).