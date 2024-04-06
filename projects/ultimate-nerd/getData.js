queue = []
nowPlaying = ""
loop = false
updateSpeed = 10000
updateContent = function() {
	fetch('https://ultimate-nerd.netheriteminer.repl.co/queue').then(res => {
		return res.json()
	})
		.then(data => {
		queue = data.queue
		nowPlaying = data.current
		loop = data.loop
	
		printQueue = ""
		for (i = 0; i < queue.length; i++) {
			printQueue += `${i+1}. ${queue[i]}<br>`
		}
	
		printLoop = ""
		if (loop === false) {
			printLoop = "Not looping!"
		}
		else {
			printLoop = "Looping!"
		}
		document.getElementById('nowPlaying').innerHTML = "<strong> Currently Playing: </strong>"+nowPlaying
		document.getElementById('loop').innerHTML = printLoop
		document.getElementById('queue').innerHTML = printQueue
		document.getElementById('rectangle').style.height = document.getElementById('queue').offsetHeight + 100 + "px"
	})
		.catch(error => {
			console.log(error)
		document.getElementById('loop').innerHTML = "Error!"
		document.getElementById('queue').innerHTML = "<br><strong>Bot is currently not active! If the bot is active, please /report this message!</strong><br>You will need to refresh if the bot has come online after seeing this message."
			clearInterval(updateDelay)
			console.log("Found error, not updating...")
	})
}
setSpeed = function(speed) {
	if (speed == 0) {
		updateSpeed = 99999999
	}
	else {
		updateSpeed = speed
	}
	updateContent()
	clearInterval(updateDelay)
	updateDelay = setInterval(updateContent, updateSpeed)
}
updateDelay = setInterval(updateContent, updateSpeed)
updateContent()