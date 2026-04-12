// Story data for each country/conflict
// Each story is a tree of nodes with choices that branch the narrative

const stories = {
  cuba: {
    title: "THE CUBAN MISSILE CRISIS",
    year: "1962",
    intro: "October 1962. The world stands on the brink of nuclear war. Soviet missiles have been discovered in Cuba, just 90 miles from American shores. You are a Cuban civilian caught between two superpowers.",
    nodes: {
      start: {
        text: "You live in Havana with your family. Rumors spread through the neighborhood — the Americans may invade any day. Soviet soldiers patrol the streets near your home. Your neighbor rushes to your door.\n\n\"They say Kennedy has ordered a naval blockade! Ships are turning back. But my cousin in the military says the Soviets have nuclear warheads here... aimed at Washington.\"\n\nYour family looks to you. What do you do?",
        choices: [
          { text: "FLEE TO THE COUNTRYSIDE", next: "flee_country" },
          { text: "STAY AND PREPARE SHELTER", next: "build_shelter" }
        ]
      },
      flee_country: {
        text: "You pack what you can carry and head east toward the Sierra Maestra mountains. The roads are chaos — military convoys heading west, civilians heading east.\n\nHistorical fact: During the crisis, many Cuban civilians were unaware of just how close nuclear war came. Soviet field commanders had tactical nuclear weapons and, at one point, nearly launched them without Moscow's approval.\n\nAs you travel, you encounter a Soviet military checkpoint.",
        choices: [
          { text: "TRY TO TALK YOUR WAY THROUGH", next: "talk_checkpoint" },
          { text: "TAKE A HIDDEN PATH THROUGH THE JUNGLE", next: "jungle_path" }
        ]
      },
      build_shelter: {
        text: "You fortify your home as best you can. You fill the bathtub with water, gather canned food, and move mattresses to the interior room with no windows.\n\nHistorical fact: On October 27, 1962 — known as 'Black Saturday' — a Soviet submarine nearly launched a nuclear torpedo at American ships. Only the objection of one officer, Vasili Arkhipov, prevented it.\n\nThe radio crackles with news: an American U-2 spy plane has been shot down over Cuba. Tensions are at their peak.",
        choices: [
          { text: "LISTEN TO THE RADIO FOR UPDATES", next: "radio_updates" },
          { text: "CHECK ON YOUR ELDERLY NEIGHBORS", next: "help_neighbors" }
        ]
      },
      talk_checkpoint: {
        text: "You approach the Soviet soldiers calmly. One speaks broken Spanish. You explain you're just a family trying to reach relatives in the countryside.\n\nThe soldier looks at your children and nods sympathetically. He waves you through but warns: \"Do not go near San Cristóbal. Very dangerous.\"\n\nHistorical fact: San Cristóbal was one of the sites where Soviet medium-range ballistic missiles were deployed, capable of reaching Washington D.C. in just 13 minutes.\n\nYou make it to a small village where you wait anxiously for news.",
        choices: [
          { text: "WAIT FOR THE CRISIS TO END", next: "ending_survive" }
        ]
      },
      jungle_path: {
        text: "You take your family through dense jungle trails. It's slow going, especially with children. But you avoid all military presence.\n\nAfter two days of walking, you reach a small fishing village on the southern coast. The people here seem almost unaware of the crisis.\n\nHistorical fact: The Cuban Missile Crisis lasted 13 days, from October 16-28, 1962. It is widely considered the closest the Cold War came to escalating into full-scale nuclear war.\n\nA fisherman offers to take you further along the coast. You settle in and wait.",
        choices: [
          { text: "WAIT FOR THE CRISIS TO END", next: "ending_survive" }
        ]
      },
      radio_updates: {
        text: "You huddle around the radio for days. Castro's voice comes through, defiant as ever. Then, on October 28, the news changes.\n\nKhrushchev has agreed to remove the missiles. Kennedy has pledged not to invade Cuba and secretly agreed to remove American missiles from Turkey.\n\nHistorical fact: The resolution of the crisis led to the establishment of a direct communication link between Washington and Moscow — the famous 'hotline' — to prevent future misunderstandings.\n\nYour family embraces. The world has stepped back from the brink.",
        choices: [
          { text: "CONTINUE", next: "ending_survive" }
        ]
      },
      help_neighbors: {
        text: "You find your elderly neighbors, the Rodriguezes, frightened and alone. Their son is in the military and they've had no word from him. You bring them to your home.\n\nTogether you share food and stories to pass the time. Mrs. Rodriguez tells you about the Bay of Pigs invasion the year before.\n\nHistorical fact: The failed Bay of Pigs invasion in April 1961, where CIA-trained Cuban exiles tried to overthrow Castro, was one of the key events that led to the Soviet Union placing missiles in Cuba.\n\nDays later, the crisis ends. The Rodriguezes' son returns home safely.",
        choices: [
          { text: "CONTINUE", next: "ending_survive" }
        ]
      },
      ending_survive: {
        text: "The Cuban Missile Crisis ends. The world breathes again.\n\nYou survived one of the most dangerous moments in human history. The crisis taught the world that nuclear war could happen not through intention, but through miscalculation and fear.\n\nKEY LESSONS:\n• The crisis lasted only 13 days but nearly ended civilization\n• Back-channel diplomacy and personal courage prevented catastrophe\n• The crisis led to the Nuclear Test Ban Treaty of 1963\n• It demonstrated that in the nuclear age, there are no winners in war\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  uk: {
    title: "THE LONDON BLITZ",
    year: "1940-1941",
    intro: "September 1940. Nazi Germany has launched a devastating bombing campaign against Britain. Every night, waves of German bombers rain destruction on London. You are a young Londoner trying to survive the Blitz.",
    nodes: {
      start: {
        text: "The air raid sirens wail across London. It's the third night in a row. Your family — mother, younger sister, and grandmother — looks to you. Father is away fighting in North Africa.\n\nThe bombs are getting closer. You can hear the drone of Luftwaffe bombers overhead.\n\n\"We need to get to shelter NOW!\" your mother shouts over the noise.",
        choices: [
          { text: "RUN TO THE UNDERGROUND STATION", next: "underground" },
          { text: "USE THE ANDERSON SHELTER IN THE GARDEN", next: "anderson" }
        ]
      },
      underground: {
        text: "You rush through darkened streets to the Tube station. Hundreds of Londoners are already there, cramped on the platforms with blankets and thermos flasks.\n\nHistorical fact: At the height of the Blitz, around 177,000 Londoners sheltered in Underground stations each night. The government initially opposed this, but public pressure forced them to allow it.\n\nA warden approaches: \"We need volunteers to help with fire watching on the rooftops. The incendiary bombs are the real danger tonight.\"",
        choices: [
          { text: "VOLUNTEER AS A FIRE WATCHER", next: "fire_watch" },
          { text: "STAY WITH YOUR FAMILY IN THE SHELTER", next: "shelter_night" }
        ]
      },
      anderson: {
        text: "You pile into the corrugated steel shelter your father built before he left. It's cold, damp, and cramped, but it's protection.\n\nHistorical fact: Anderson shelters were issued free to households earning less than £250 a year. Over 2 million were distributed. They could withstand a nearby blast but not a direct hit.\n\nThe bombing is intense tonight. The ground shakes with each explosion. Your sister cries quietly.",
        choices: [
          { text: "COMFORT YOUR SISTER WITH A STORY", next: "comfort" },
          { text: "PEEK OUTSIDE TO CHECK FOR FIRES", next: "check_fires" }
        ]
      },
      fire_watch: {
        text: "You climb to the rooftop of a building near St. Paul's Cathedral. The sky is orange with flames. You can see fires burning across the East End.\n\nYour job is to spot incendiary bombs and extinguish them before they start larger fires. You work through the night with a bucket of sand and a stirrup pump.\n\nHistorical fact: On December 29, 1940, the Luftwaffe dropped thousands of incendiary bombs on London, creating a firestorm. Firefighters and volunteers saved St. Paul's Cathedral, which became a symbol of British resilience.\n\nBy dawn, you're exhausted but alive. The all-clear sounds.",
        choices: [
          { text: "CONTINUE", next: "morning_after" }
        ]
      },
      shelter_night: {
        text: "You spend the night underground. People sing songs to keep spirits up. An elderly man plays a harmonica. Children sleep on the platform edges.\n\nHistorical fact: The Blitz killed over 43,000 civilians and destroyed more than a million London homes. But it failed in its objective — to break British morale and force a surrender.\n\nWinston Churchill's famous words echo in your mind: \"We shall never surrender.\"\n\nThe all-clear siren finally sounds at dawn.",
        choices: [
          { text: "CONTINUE", next: "morning_after" }
        ]
      },
      comfort: {
        text: "You tell your sister about the brave pilots of the RAF who are fighting the bombers above. She asks if father is as brave as them.\n\n\"Braver,\" you say.\n\nHistorical fact: The RAF lost 544 pilots during the Battle of Britain. Churchill said of them: \"Never in the field of human conflict was so much owed by so many to so few.\"\n\nThe bombing fades toward dawn. You've survived another night.",
        choices: [
          { text: "CONTINUE", next: "morning_after" }
        ]
      },
      check_fires: {
        text: "You open the shelter door carefully. Two houses down the street are ablaze. Mrs. Patterson from number 12 is calling for help — she's trapped by debris.\n\nYou rush to help, pulling bricks away until she can crawl free. The ARP wardens arrive moments later.\n\nHistorical fact: ARP (Air Raid Precautions) wardens were civilian volunteers who patrolled during raids, enforced blackout regulations, and helped rescue trapped civilians. Over 200 wardens were killed during the Blitz.\n\nYou saved a life tonight.",
        choices: [
          { text: "CONTINUE", next: "morning_after" }
        ]
      },
      morning_after: {
        text: "Dawn reveals the damage. Smoke rises from dozens of fires. Rubble fills the streets. But London stands.\n\nPeople emerge from shelters, dust themselves off, and carry on. The buses run. The shops open. Life continues in defiance.\n\nKEY LESSONS:\n• The Blitz lasted from September 1940 to May 1941 — 8 months of sustained bombing\n• Over 30,000 bombs fell on London alone\n• Civilian courage and community spirit were as important as military defense\n• The Blitz failed to break British morale — it strengthened resolve instead\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  china: {
    title: "THE NANJING MASSACRE",
    year: "1937",
    intro: "December 1937. The Imperial Japanese Army has captured Nanjing, the capital of China. What follows is one of the darkest chapters of World War II. You are a peasant farmer living on the outskirts of the city with your family.",
    nodes: {
      start: {
        text: "The Japanese military is advancing on Nanjing. Explosions echo from the city walls. Your father grabs you by the shoulders.\n\n\"We need to leave now, son, before the Japanese military kill us! Where do we go?\"\n\nYou have little knowledge as a peasant farmer, but you must decide quickly.",
        choices: [
          { text: "PRETEND TO BE A JAPANESE SOLDIER", next: "pretend_soldier" },
          { text: "RUN TO SOUTHERN CHINA", next: "run_south" }
        ]
      },
      pretend_soldier: {
        text: "This is an extremely dangerous plan. You find an abandoned Japanese uniform but you don't speak Japanese. Within hours, a patrol stops you.\n\nYou cannot answer their questions. But a Chinese man working as a translator intervenes — he tells them you are shell-shocked and mute.\n\nHistorical fact: Some Chinese civilians did attempt disguises to survive, but most who were caught were executed immediately. The Japanese military killed an estimated 200,000-300,000 civilians during the massacre.\n\nThe translator whispers: \"Come with me. I know a safe place.\"",
        choices: [
          { text: "FOLLOW THE TRANSLATOR", next: "safety_zone" },
          { text: "TRY TO ESCAPE ON YOUR OWN", next: "escape_alone" }
        ]
      },
      run_south: {
        text: "You and your family flee south, avoiding the main roads. You travel through rice paddies and along river banks. The sounds of violence from the city haunt you.\n\nHistorical fact: The Nanjing Massacre, also known as the Rape of Nanjing, lasted approximately six weeks. During this time, Japanese soldiers committed widespread atrocities against civilians.\n\nAfter days of walking, you encounter other refugees. They tell you about a safe zone in the city, set up by foreigners.",
        choices: [
          { text: "CONTINUE FLEEING SOUTH", next: "reach_safety_south" },
          { text: "TURN BACK TO THE SAFE ZONE", next: "safety_zone" }
        ]
      },
      safety_zone: {
        text: "You reach the Nanjing Safety Zone, established by a group of Western nationals who remained in the city. A German businessman named John Rabe leads the effort.\n\nHistorical fact: John Rabe, a German businessman and member of the Nazi Party, used his status to protect approximately 200,000 Chinese civilians in the Safety Zone. He is sometimes called 'the Oskar Schindler of China.'\n\nThe zone is crowded but offers protection. Rabe and the other foreigners negotiate with Japanese officers to keep soldiers out.",
        choices: [
          { text: "HELP ORGANIZE THE REFUGEES", next: "help_refugees" },
          { text: "KEEP YOUR FAMILY HIDDEN AND QUIET", next: "stay_hidden" }
        ]
      },
      escape_alone: {
        text: "You slip away in the chaos and make your way toward the Yangtze River. If you can cross it, you might reach safety.\n\nHistorical fact: Thousands of Chinese soldiers and civilians tried to flee across the Yangtze River. Many drowned in the attempt, as boats were scarce and the river was wide and cold in December.\n\nYou find a small fishing boat hidden in the reeds. There's room for a few people.",
        choices: [
          { text: "TAKE OTHER REFUGEES WITH YOU", next: "river_crossing" }
        ]
      },
      reach_safety_south: {
        text: "After weeks of difficult travel, your family reaches the countryside far from Nanjing. You find shelter with distant relatives in a farming village.\n\nHistorical fact: The Japanese occupation of China lasted from 1937 to 1945. During this time, an estimated 14-20 million Chinese civilians died from war-related causes.\n\nYou are safe for now, but the war is far from over. You think of those you left behind in Nanjing.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      help_refugees: {
        text: "You help distribute food and organize sleeping areas. You meet Minnie Vautrin, an American missionary who protects thousands of women and children at Ginling College.\n\nHistorical fact: Minnie Vautrin sheltered approximately 10,000 women and children at Ginling College during the massacre. She confronted Japanese soldiers at the gates to prevent them from entering. She is honored as a hero in China today.\n\nYour efforts save lives and keep hope alive in the darkest of times.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      stay_hidden: {
        text: "You keep your family in a corner of a warehouse within the Safety Zone. For weeks, you hear terrible things happening outside the zone's boundaries.\n\nHistorical fact: The International Committee members, including John Rabe, documented the atrocities in letters and diaries. These records became crucial historical evidence of what happened during the massacre.\n\nEventually, some order is restored. Your family survived because of the courage of a handful of foreigners who chose to stay.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      river_crossing: {
        text: "You take as many people as the small boat can safely hold and cross the icy Yangtze. It's terrifying — the current is strong and the boat is overloaded.\n\nBut you make it. On the other side, you help others who are still crossing.\n\nHistorical fact: The Nanjing Massacre was one of the reasons the International Military Tribunal for the Far East (the Tokyo Trials) was held after the war, where Japanese military leaders were tried for war crimes.\n\nYou and your family begin the long journey to safety.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      ending: {
        text: "You survived one of the most terrible events in modern history.\n\nThe Nanjing Massacre remains a solemn reminder of what happens when military power goes unchecked and humanity is abandoned.\n\nKEY LESSONS:\n• An estimated 200,000-300,000 civilians were killed in just six weeks\n• Individual acts of courage — by people like John Rabe and Minnie Vautrin — saved thousands\n• The massacre was extensively documented and is recognized as a war crime\n• Remembering these events is essential to preventing them from happening again\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  norway: {
    title: "THE NORWEGIAN RESISTANCE",
    year: "1940-1945",
    intro: "April 1940. Nazi Germany has invaded Norway in a surprise attack. The Norwegian military is overwhelmed, and the king has fled to Britain. You are a young Norwegian in a small fjord village, watching German soldiers march into your town.",
    nodes: {
      start: {
        text: "German soldiers have occupied your village. They've set up a command post in the town hall and imposed strict curfews. Your older brother whispers to you at night.\n\n\"There's a resistance group forming in the mountains. They need people. But if the Germans catch us, they'll execute our whole family.\"\n\nWhat do you do?",
        choices: [
          { text: "JOIN THE RESISTANCE", next: "join_resistance" },
          { text: "STAY AND PROTECT YOUR FAMILY", next: "stay_home" }
        ]
      },
      join_resistance: {
        text: "You and your brother trek into the mountains under cover of darkness. You find a group of Norwegians living in a hidden cabin, coordinating with British intelligence.\n\nHistorical fact: The Norwegian resistance, known as Milorg, grew from small groups of patriots to an organized force of over 40,000 by the end of the war. They provided crucial intelligence to the Allies.\n\nThe resistance leader assigns you a mission: help sabotage the heavy water plant at Vemork.",
        choices: [
          { text: "ACCEPT THE SABOTAGE MISSION", next: "sabotage_mission" },
          { text: "WORK AS A MESSENGER INSTEAD", next: "messenger" }
        ]
      },
      stay_home: {
        text: "You stay in the village, but resistance finds you anyway. The local teacher asks you to help hide copies of illegal newspapers that report real war news, not German propaganda.\n\nHistorical fact: The Norwegian press was censored under occupation. Underground newspapers became vital for maintaining morale. Over 300 illegal publications circulated during the war.\n\nOne day, a Jewish family arrives at your door, desperate for help. The Germans are rounding up Norwegian Jews.",
        choices: [
          { text: "HIDE THE FAMILY IN YOUR BARN", next: "hide_family" },
          { text: "HELP THEM ESCAPE TO SWEDEN", next: "escape_sweden" }
        ]
      },
      sabotage_mission: {
        text: "You train for weeks in the mountains. The target: the Norsk Hydro heavy water plant at Vemork, which the Germans need for their atomic bomb research.\n\nYour team descends a steep gorge in winter conditions, crosses a frozen river, and climbs to the plant under cover of darkness.\n\nHistorical fact: The real Operation Gunnerside in February 1943 was carried out by Norwegian commandos trained in Britain. They successfully destroyed the heavy water production equipment, dealing a significant blow to the German nuclear program.\n\nThe mission is a success. You escape into the mountains.",
        choices: [
          { text: "CONTINUE", next: "ending_resistance" }
        ]
      },
      messenger: {
        text: "You become a courier, carrying coded messages between resistance cells. You ski across mountain passes in blizzards, avoiding German patrols.\n\nHistorical fact: Norway's harsh terrain — mountains, fjords, and extreme winter conditions — made it ideal for guerrilla resistance. Skilled Norwegian skiers could traverse terrain that German soldiers could not.\n\nYour messages help coordinate supply drops from British planes and warn of German operations. You are a vital link in the chain.",
        choices: [
          { text: "CONTINUE", next: "ending_resistance" }
        ]
      },
      hide_family: {
        text: "You hide the Feldmann family in a secret room behind your barn. For months, you bring them food and news. It's terrifying — German soldiers search houses regularly.\n\nHistorical fact: Of Norway's 2,173 Jews, 773 were deported to Auschwitz. Only 34 survived. But Norwegian civilians helped over 1,000 Jews escape to neutral Sweden, risking their own lives.\n\nEventually, you arrange for the Feldmanns to be smuggled across the border to Sweden. They survive the war.",
        choices: [
          { text: "CONTINUE", next: "ending_resistance" }
        ]
      },
      escape_sweden: {
        text: "You guide the family through the forests toward the Swedish border. It's a dangerous three-day journey through snow and wilderness, avoiding German border patrols.\n\nHistorical fact: Sweden remained neutral during WWII and became a refuge for thousands of Norwegian Jews and resistance fighters. The border crossing was extremely dangerous, with German patrols and the risk of frostbite.\n\nYou reach the border. The family crosses to safety. You return home to continue the fight.",
        choices: [
          { text: "CONTINUE", next: "ending_resistance" }
        ]
      },
      ending_resistance: {
        text: "On May 8, 1945, Germany surrenders. Norway is free.\n\nThe Norwegian resistance played a crucial role in the Allied victory, from sabotaging the German nuclear program to rescuing Jews and providing intelligence.\n\nKEY LESSONS:\n• Norway was occupied for 5 years but never stopped resisting\n• The heavy water sabotage may have prevented Germany from developing an atomic bomb\n• Ordinary Norwegians risked everything to protect their Jewish neighbors\n• Resistance took many forms: from armed sabotage to hiding newspapers\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  japan: {
    title: "HIROSHIMA",
    year: "1945",
    intro: "August 1945. World War II is in its final days. Japan has been fighting for years, and American bombers have been devastating Japanese cities. You are a student living in Hiroshima, unaware that your city has been chosen as the target for a weapon unlike anything the world has ever seen.",
    nodes: {
      start: {
        text: "It is the morning of August 6, 1945. You are walking to your school. The sky is clear and beautiful. Air raid sirens sounded earlier but the all-clear was given — it seemed to be just a reconnaissance plane.\n\nYour friend Kenji runs up to you. \"My father says the war will be over soon. Do you think we'll win?\"\n\nBefore you can answer, you notice a single B-29 bomber high above the city.",
        choices: [
          { text: "LOOK UP AT THE PLANE", next: "the_flash" },
          { text: "HURRY INSIDE THE SCHOOL BUILDING", next: "inside_school" }
        ]
      },
      the_flash: {
        text: "At 8:15 AM, a blinding flash of light — brighter than a thousand suns — fills the sky. Then silence. Then a shockwave of unimaginable force.\n\nHistorical fact: The atomic bomb 'Little Boy' detonated 600 meters above Hiroshima with a force equivalent to 15,000 tons of TNT. The temperature at the hypocenter reached millions of degrees.\n\nYou are knocked unconscious. When you wake, the world has changed completely. Buildings are flattened. Fires burn everywhere. People wander in shock.",
        choices: [
          { text: "SEARCH FOR YOUR FAMILY", next: "search_family" },
          { text: "HELP THE INJURED AROUND YOU", next: "help_injured" }
        ]
      },
      inside_school: {
        text: "You enter the school just as the bomb detonates. The concrete building partially shields you from the blast, but windows shatter inward and the ceiling partially collapses.\n\nHistorical fact: People inside reinforced concrete buildings within 1-2 km of the hypocenter had a higher survival rate than those outdoors. The bomb destroyed approximately 70,000 of Hiroshima's 76,000 buildings.\n\nYou crawl out from under a desk. Your classmates are injured. Your teacher is calling for calm.",
        choices: [
          { text: "HELP EVACUATE YOUR CLASSMATES", next: "evacuate_school" },
          { text: "RUN HOME TO FIND YOUR FAMILY", next: "search_family" }
        ]
      },
      search_family: {
        text: "You stumble through a city that no longer exists. Landmarks are gone. Streets are unrecognizable. You walk toward where your home should be.\n\nHistorical fact: The bomb killed an estimated 80,000 people instantly. By the end of 1945, the death toll reached approximately 140,000 due to injuries and radiation sickness.\n\nYou find your neighborhood destroyed. But in the rubble, you hear your mother's voice calling your name. She survived in the family's small basement.",
        choices: [
          { text: "TAKE HER TO THE RIVER FOR WATER", next: "the_river" }
        ]
      },
      help_injured: {
        text: "You help pull survivors from the rubble. A doctor working with almost no supplies treats burns and wounds. You carry water from a broken pipe.\n\nHistorical fact: Almost all of Hiroshima's doctors and nurses were killed or injured in the blast, as the hospitals were near the city center. Of 298 doctors in Hiroshima, only 28 were able to function.\n\nYou work for hours. The scenes you witness will stay with you forever.",
        choices: [
          { text: "CONTINUE HELPING THROUGH THE DAY", next: "the_river" }
        ]
      },
      evacuate_school: {
        text: "You help carry injured classmates out of the damaged school. Outside, the city is an inferno. Black rain begins to fall — radioactive debris mixed with moisture.\n\nHistorical fact: The 'black rain' that fell after the bombing contained radioactive fallout. It contaminated water supplies and caused radiation sickness in people who were not directly exposed to the blast.\n\nYour teacher leads the group toward the outskirts of the city, away from the fires.",
        choices: [
          { text: "CONTINUE WITH THE GROUP", next: "the_river" }
        ]
      },
      the_river: {
        text: "Thousands of survivors make their way to the rivers of Hiroshima, desperate for water. The scene is heartbreaking.\n\nThree days later, on August 9, a second atomic bomb is dropped on Nagasaki. On August 15, Emperor Hirohito announces Japan's surrender.\n\nHistorical fact: The debate over whether the atomic bombings were necessary to end the war continues to this day. What is undeniable is the immense human suffering they caused, and the new era of nuclear fear they inaugurated.\n\nYou survived. But Hiroshima — and the world — will never be the same.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      ending: {
        text: "The atomic bombing of Hiroshima was a turning point in human history.\n\nSurvivors, known as 'hibakusha,' dedicated their lives to telling their stories and advocating for nuclear disarmament. Their message: this must never happen again.\n\nKEY LESSONS:\n• The bomb killed 140,000 people in Hiroshima by the end of 1945\n• Hiroshima's Peace Memorial stands as a UNESCO World Heritage Site\n• The hibakusha movement has been crucial in nuclear disarmament efforts\n• The bombings raised profound moral questions that remain relevant today\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  italy: {
    title: "THE FALL OF ROME",
    year: "1943-1944",
    intro: "September 1943. Italy has surrendered to the Allies, but Germany has seized control of Rome. The city is under Nazi occupation. You are a young Roman caught between occupiers, partisans, and the approaching Allied armies.",
    nodes: {
      start: {
        text: "German soldiers patrol the streets of Rome. The Italian king has fled south. Mussolini has been rescued by German commandos and set up a puppet state in the north.\n\nYour uncle, a former Italian soldier, comes to you in secret. \"The Germans are rounding up Rome's Jews. The partisans are organizing. I'm joining them.\"\n\nHe looks at you expectantly.",
        choices: [
          { text: "JOIN THE PARTISAN RESISTANCE", next: "join_partisans" },
          { text: "HELP HIDE JEWISH FAMILIES", next: "hide_jews" }
        ]
      },
      join_partisans: {
        text: "You join a partisan cell operating in Rome. Your group plans acts of sabotage against the German occupation — cutting communication lines, ambushing patrols, and gathering intelligence for the Allies.\n\nHistorical fact: Italian partisans played a significant role in the liberation of Italy. An estimated 200,000 Italians fought as partisans, and about 70,000 were killed.\n\nYour cell leader tells you about a planned attack on a German police battalion marching through Via Rasella.",
        choices: [
          { text: "PARTICIPATE IN THE VIA RASELLA ATTACK", next: "via_rasella" },
          { text: "FOCUS ON INTELLIGENCE GATHERING", next: "intelligence" }
        ]
      },
      hide_jews: {
        text: "On October 16, 1943, the Germans launch a roundup of Rome's Jewish community. You help families escape through back alleys and hide them in cellars, convents, and churches.\n\nHistorical fact: During the roundup, 1,259 Jews were arrested in Rome. 1,023 were deported to Auschwitz, where only 16 survived. However, thousands were saved by ordinary Romans and Catholic institutions who hid them.\n\nA priest at a nearby church asks you to help shelter families in the Vatican properties.",
        choices: [
          { text: "HELP AT THE CHURCH", next: "church_shelter" },
          { text: "CONTINUE HIDING PEOPLE IN YOUR NEIGHBORHOOD", next: "neighborhood_help" }
        ]
      },
      via_rasella: {
        text: "The attack on Via Rasella kills 33 German soldiers. But the reprisal is swift and terrible.\n\nHistorical fact: In response to the Via Rasella attack on March 23, 1944, the Germans executed 335 Italian civilians and political prisoners at the Ardeatine Caves the next day — 10 for every German soldier killed, plus 5 more. This became known as the Ardeatine Massacre.\n\nThe horror of the reprisal weighs heavily. But the resistance continues, knowing that liberation is coming.",
        choices: [
          { text: "CONTINUE FIGHTING UNTIL LIBERATION", next: "liberation" }
        ]
      },
      intelligence: {
        text: "You work as a spy, memorizing German troop positions and passing information to Allied agents. You use a cover job as a delivery boy to move freely through the city.\n\nHistorical fact: Intelligence from Italian partisans and civilians was crucial for the Allied advance up the Italian peninsula. Rome was declared an 'open city' to prevent its destruction, though the Germans still occupied it.\n\nYour information helps the Allies plan their advance on Rome.",
        choices: [
          { text: "CONTINUE UNTIL LIBERATION", next: "liberation" }
        ]
      },
      church_shelter: {
        text: "You help shelter dozens of Jewish families in church properties across Rome. The Pope's role is controversial — some Vatican institutions help, while the Pope himself remains publicly silent.\n\nHistorical fact: Catholic convents, monasteries, and churches in Rome hid an estimated 4,000-5,000 Jews during the German occupation. Individual priests and nuns showed extraordinary courage, even as the Vatican's official response remains debated by historians.\n\nYou personally help save 30 people from deportation.",
        choices: [
          { text: "CONTINUE UNTIL LIBERATION", next: "liberation" }
        ]
      },
      neighborhood_help: {
        text: "You create a network of safe houses in your neighborhood. Families rotate between locations to avoid suspicion. You forge identity documents and ration cards.\n\nHistorical fact: Many ordinary Romans risked their lives to hide Jewish neighbors. The penalty for harboring Jews under German occupation was death. Despite this, the majority of Rome's Jewish population — about 10,000 people — survived the occupation thanks to civilian help.\n\nEvery person you hide is a life saved.",
        choices: [
          { text: "CONTINUE UNTIL LIBERATION", next: "liberation" }
        ]
      },
      liberation: {
        text: "On June 4, 1944, Allied troops enter Rome. The city is liberated. Crowds fill the streets, cheering and weeping with joy.\n\nYou survived nine months of German occupation. Your courage — and the courage of thousands of ordinary Romans — made a difference.\n\nKEY LESSONS:\n• Rome was under German occupation for 9 months (Sept 1943 - June 1944)\n• Over 2,000 Roman Jews were killed, but 10,000 were saved by civilians\n• The Italian partisan movement was one of the largest resistance movements in Europe\n• Liberation came at a tremendous cost — but ordinary people made extraordinary choices\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  }
};

export default stories;
