class Original_Poster_Indicator {

	static init(){
		this.PLUGIN_ID = "pd_original_poster_indicator";
		this.icon = null;
		this.route = pb.data("route");
		this.page = pb.data("page");
		this.created_by = 0;

		this.setup();

		if(this.route && this.route.name == "thread" && this.page && this.page.thread){
			this.created_by = parseInt(this.page.thread.created_by, 10);

			if(this.created_by > 0){
				$(this.ready.bind(this));
			}
		}
	}

	static ready(){
		this.add_icon();
		proboards.on("afterSearch", this.add_icon.bind(this));
	}

	static add_icon(){
		$(".mini-profile").each((i, elem) => {
			let $mini = $(elem);
			let poster_id = parseInt($mini.find("a.user-link").attr("data-id"), 10);

			if(poster_id == this.created_by){
				$mini.css("position", "relative");
				$mini.append("<img class='original-poster-indicator' src='" + this.icon + "' title='Original Poster' alt='Original Poster' />");
			}
		});
	}

	static setup(){
		let plugin = pb.plugin.get(this.PLUGIN_ID);

		if(plugin && plugin.images){
			this.icon = plugin.images.tick;
		}
	}

}

Original_Poster_Indicator.init();