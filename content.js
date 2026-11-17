/*
 * Default content for the Ddangkong manual.
 * index.html renders from this. admin.html edits a copy in the browser and can
 * export an updated version of this file (replace it in the repo to publish).
 *
 * In list items:  **text** = bold,  {{blood}} = the blood icon.
 */
window.DDANGKONG_DEFAULTS = {
  "siteTitle": "Ddangkong Manual",
  "navBrand": "Home",
  "heroHeading": "Ddangkong Caretaking Guide",
  "sections": [
    {
      "id": "feeding", "nav": "Feeding", "theme": "colored",
      "image": "feeding-img.png", "imageAlt": "",
      "heading": "Feeding Ddangkong", "headingTag": "h2",
      "blocks": [
        { "title": "Dry Food", "tag": "h3", "items": [
          "Automatic feeder dispenses 3/20 cups (15oz) in the morning."
        ]},
        { "title": "Wet Food", "tag": "h3", "items": [
          "Grab a feeding bowl (make sure it’s clean!).",
          "Pour out one small can in the bowl (you can see if Ddangkong wants to choose).",
          "Fill the can with a small amount of cold water and pour in the bowl.",
          "Pour one scoopful of Lysine in the bowl and mix together.",
          "Ddangkong will eat it eventually."
        ]},
        { "title": "Litterbox", "tag": "h3", "image": "litterbox-img.png", "imageAlt": "cat-litter-image", "items": [
          "Open the screen and take out the litter box and bring it to the toilet.",
          "Use the scoop and find the treasure!",
          "Make sure to shake off extra litter before pouring it in the toilet.",
          "After you finish scooping, use the cleaning spray and spray all around the litter.",
          "Mix the spray and the litter together (~2 - 3 times).",
          "Put the litter box back and make sure to wash your hands!"
        ]}
      ]
    },
    {
      "id": "nails", "nav": "Nails", "theme": "white",
      "image": "cat-nails-img.png", "imageAlt": "",
      "heading": "Be Careful! Sharp Nails!", "headingTag": "h2",
      "blocks": [
        { "title": "", "tag": "h3", "items": [
          "**Cut the nails weekly! Unless you want scars!**",
          "Have one person hold him while the other person cuts the nails. (One person can also feed him a snack while the other is cutting his nails, this is messier though).",
          "Grab the claw and squeeze gently for the nail to come out.",
          "Cut at a ~45 degree angle. Make sure you don’t cut too much or he’ll bleed! {{blood}}"
        ]}
      ]
    },
    {
      "id": "water-fountain", "nav": "Water Fountain", "theme": "colored",
      "image": "water-img.png", "imageAlt": "water-image",
      "heading": "Water Fountain", "headingTag": "h2",
      "blocks": [
        { "title": "", "tag": "h3", "items": [
          "Check his water fountain every 2 weeks or so. It will also start making weird sounds if there's not enough water.",
          "Grab the top section of the fountain and it will detach from the bottom.",
          "Spin the top counter-clockwise to take it off.",
          "Grab the small hole on the side to take off the other parts.",
          "Use the small brush and scrub each part of the water fountain.",
          "Rinse off the water filter, if it’s too dirty, feel free to replace it.",
          "Put everything back in order and refill with **cold water**."
        ]}
      ]
    },
    {
      "id": "cleaning", "nav": "Cleaning", "theme": "white",
      "image": "clean-cat-img.png", "imageAlt": "",
      "heading": "Cleaning Ddangkong", "headingTag": "h2",
      "blocks": [
        { "title": "", "tag": "h3", "items": [
          "If Ddangkong runs out, please clean him!",
          "Use the hypoallergenic wipes to clean his entire body including the tail!",
          "After he uses the bathroom, he might not clean himself, please check and clean him if needed."
        ]}
      ]
    },
    {
      "id": "questions", "nav": "Questions", "theme": "colored",
      "image": "question-img.png", "imageAlt": "",
      "heading": "What to do if he starts ...", "headingTag": "h1",
      "blocks": [
        { "title": "Biting?", "tag": "h2", "items": [
          "He's either hungry or wants to play.",
          "Bring him to his food. Or bring his food to him and see if he eats.",
          "Cover yourself with the blankets provided (he hates them and won't bite you!).",
          "Play a video with birds/squirrels or fish to distract him.",
          "Throw him in the bedroom. If he meows you can ignore him!"
        ]},
        { "title": "Running?", "tag": "h2", "items": [
          "He usually runs around after going to the bathroom and doing his business.",
          "Check if he cleaned himself because he might leave a stain on the furniture!",
          "It's fine to let him run or you can catch him if you need to."
        ]}
      ]
    },
    {
      "id": "playtime", "nav": "Playtime", "theme": "white",
      "image": "cat-teaser-img.png", "imageAlt": "",
      "heading": "Playtime", "headingTag": "h2",
      "blocks": [
        { "title": "", "tag": "h3", "items": [
          "Use the cat teaser to play with him or anything with string.",
          "He loves his mouse toys! Grab one and throw it and watch the little guy chase it down! (They might get lost under the couch)"
        ]}
      ]
    },
    {
      "id": "warning", "nav": "Warnings", "theme": "colored",
      "image": "warning-img.png", "imageAlt": "warning-icon",
      "heading": "Watch Out!", "headingTag": "h2",
      "blocks": [
        { "title": "", "tag": "h3", "items": [
          "Never keep anything that can break easily and is light on the tables. The little monster **WILL** push it over the table.",
          "**DO NOT** leave any small things on the floor like beads, earrings, etc. He will try to eat it.",
          "Be cautious when eating chocolate or using coffee beans. They’re poison to Ddangkong!"
        ]}
      ]
    }
  ]
};

/* Section icons the admin form lets you choose from (files in /images). */
window.DDANGKONG_IMAGES = [
  "feeding-img.png", "litterbox-img.png", "cat-nails-img.png", "water-img.png",
  "clean-cat-img.png", "question-img.png", "cat-teaser-img.png", "warning-img.png"
];
