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
        text: "You approach the Soviet soldiers calmly. One speaks broken Spanish. You explain you're just a family trying to reach relatives in the countryside.\n\nThe soldier looks at your children and nods sympathetically. He waves you through but warns: \"Do not go near San Cristóbal. Very dangerous.\"\n\nHistorical fact: San Cristóbal was one of the sites where Soviet medium-range ballistic missiles were deployed, capable of reaching Washington D.C. in just 13 minutes.\n\nYou make it to a small village. But the village is tense — American planes fly overhead constantly.",
        choices: [
          { text: "HELP THE VILLAGERS BUILD A SHELTER", next: "village_shelter" },
          { text: "TRY TO REACH THE COAST AND FIND A BOAT", next: "coast_escape" },
          { text: "STAY HIDDEN AND WAIT FOR NEWS", next: "radio_updates" }
        ]
      },
      village_shelter: {
        text: "You help the villagers dig a shelter in the hillside. Working together, you reinforce it with timber and stones. The children play nearby, unaware of how close the world is to destruction.\n\nHistorical fact: On October 26, Khrushchev sent a personal letter to Kennedy, offering to remove missiles in exchange for a US promise not to invade Cuba. Kennedy's advisors were divided on how to respond.\n\nAn old farmer shares his rum with you. \"If the bombs come,\" he says, \"at least we face them together.\"",
        choices: [
          { text: "WAIT FOR THE CRISIS TO END", next: "ending_survive" }
        ]
      },
      coast_escape: {
        text: "You trek south toward the coast, passing through sugar cane fields and along dirt roads. After a full day of walking, you reach a small fishing harbor.\n\nHistorical fact: During the crisis, the US Navy established a naval blockade (called a 'quarantine') around Cuba. Over 180 ships enforced the blockade, turning back Soviet vessels carrying missiles.\n\nA fisherman named Carlos offers to hide your family in his boat house. From the shore, you can see American warships on the horizon. The standoff is real.",
        choices: [
          { text: "STAY WITH CARLOS AND FISH TO SURVIVE", next: "fishing_survive" },
          { text: "TRY TO SAIL TO MEXICO", next: "mexico_attempt" }
        ]
      },
      fishing_survive: {
        text: "Carlos teaches you to fish. For days you live on the coast, eating fresh catch and sleeping in his boat house. His radio crackles with updates.\n\nHistorical fact: Attorney General Robert Kennedy secretly met with Soviet Ambassador Dobrynin on October 27, offering to remove US missiles from Turkey in exchange for Soviet missiles leaving Cuba. This secret deal helped end the crisis.\n\nOn October 28, Carlos bursts in: \"It's over! Khrushchev is removing the missiles!\"",
        choices: [
          { text: "CONTINUE", next: "ending_survive" }
        ]
      },
      mexico_attempt: {
        text: "Carlos warns you it's suicide — the American navy will stop any boat. But desperation drives you. You set out at night in a small fishing boat.\n\nYou don't get far. An American patrol boat spots you within hours. They board your vessel, find only a terrified family, and after tense questioning, escort you back to shore.\n\nHistorical fact: The US military was on DEFCON 2 during the crisis — the highest alert level ever reached (except DEFCON 1, which means nuclear war is imminent). Military personnel were authorized to shoot down any unidentified aircraft.\n\nBack on shore, you wait out the final days. The crisis ends.",
        choices: [
          { text: "CONTINUE", next: "ending_survive" }
        ]
      },
      jungle_path: {
        text: "You take your family through dense jungle trails. It's slow going, especially with children. Mosquitoes swarm and the heat is unbearable.\n\nAfter two days of walking, you reach a small fishing village on the southern coast. The people here seem almost unaware of the crisis.\n\nHistorical fact: The Cuban Missile Crisis lasted 13 days, from October 16-28, 1962. It is widely considered the closest the Cold War came to escalating into full-scale nuclear war.\n\nA fisherman offers to take you further along the coast. But you also notice a school that's been converted into a makeshift hospital.",
        choices: [
          { text: "HELP AT THE MAKESHIFT HOSPITAL", next: "hospital_help" },
          { text: "CONTINUE SOUTH TO THE FISHING VILLAGE", next: "fishing_survive" },
          { text: "STAY HERE AND WAIT IT OUT", next: "radio_updates" }
        ]
      },
      hospital_help: {
        text: "The hospital is overwhelmed. A doctor — the only one for miles — is treating soldiers and civilians alike. You help carry water, clean wounds, and comfort the injured.\n\nHistorical fact: Cuba had mobilized 270,000 troops and militia during the crisis, preparing for a US invasion that seemed inevitable. Many soldiers were teenagers and young farmers like you.\n\nA young soldier, barely older than you, grips your hand. \"Tell my mother I was brave,\" he whispers. He's not wounded from war — just exhaustion and fear.\n\nDays later, the crisis ends. You helped save lives.",
        choices: [
          { text: "CONTINUE", next: "ending_survive" }
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
        text: "You climb to the rooftop of a building near St. Paul's Cathedral. The sky is orange with flames. You can see fires burning across the East End.\n\nYour job is to spot incendiary bombs and extinguish them before they start larger fires. You work through the night with a bucket of sand and a stirrup pump.\n\nHistorical fact: On December 29, 1940, the Luftwaffe dropped thousands of incendiary bombs on London, creating a firestorm. Firefighters and volunteers saved St. Paul's Cathedral, which became a symbol of British resilience.\n\nSuddenly an incendiary lands on the roof of the building next door. A woman screams from inside.",
        choices: [
          { text: "RUSH TO EXTINGUISH THE BOMB", next: "extinguish_bomb" },
          { text: "RUN INSIDE TO EVACUATE THE BUILDING", next: "evacuate_building" },
          { text: "SIGNAL THE FIRE BRIGADE FOR HELP", next: "fire_brigade" }
        ]
      },
      extinguish_bomb: {
        text: "You grab your bucket of sand and sprint across the gap between rooftops. The incendiary is sputtering white-hot phosphorus. You dump the sand directly on it, smothering the flame.\n\nThe building is saved. The woman — a nurse heading to her night shift — thanks you through tears.\n\nHistorical fact: Incendiary bombs were small but deadly. Each one could start a fire that would destroy an entire building. Trained fire watchers saved countless structures during the Blitz.\n\nBy dawn, you're exhausted but alive. The all-clear sounds.",
        choices: [
          { text: "CONTINUE", next: "morning_after" }
        ]
      },
      evacuate_building: {
        text: "You rush down the stairs and pound on doors. Three families are still inside — they hadn't heard the alarm over the bombing. You guide them out through the smoke as flames spread across the top floor.\n\nHistorical fact: Many Blitz casualties occurred when people refused to leave their homes during raids. The government eventually mandated compulsory evacuation in heavily targeted areas.\n\nEveryone gets out. The building burns, but no lives are lost. The fire brigade arrives too late to save the structure, but thanks to you, that's all that was lost.",
        choices: [
          { text: "CONTINUE", next: "morning_after" }
        ]
      },
      fire_brigade: {
        text: "You use your torch to signal the fire brigade station three streets away. Within minutes, they arrive with their pump engine.\n\nThe firefighters are volunteers — a shopkeeper, a teacher, a retired sailor. They work with practiced efficiency to control the blaze.\n\nHistorical fact: London's fire service was overwhelmed during the Blitz. The Auxiliary Fire Service recruited over 200,000 volunteers. Many had no prior experience — they learned on the job during actual air raids.\n\nTogether you contain the fire. By dawn, you're exhausted but alive.",
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
        text: "Dawn reveals the damage. Smoke rises from dozens of fires. Rubble fills the streets. But London stands.\n\nPeople emerge from shelters, dust themselves off, and carry on. The buses run. The shops open. A woman sweeps broken glass from her doorstep.\n\nHistorical fact: During the Blitz, Londoners developed a spirit known as 'the Blitz spirit' — a determination to carry on with normal life despite the bombing. This resilience became a defining part of British identity.\n\nYour mother asks what you want to do today. The bombs will come again tonight.",
        choices: [
          { text: "HELP CLEAR RUBBLE AND SEARCH FOR SURVIVORS", next: "clear_rubble" },
          { text: "QUEUE FOR RATIONS — YOUR FAMILY NEEDS FOOD", next: "ration_queue" },
          { text: "WRITE A LETTER TO FATHER IN NORTH AFRICA", next: "write_letter" }
        ]
      },
      clear_rubble: {
        text: "You join a team of volunteers digging through the ruins of a collapsed pub. You find three survivors — a barman and two patrons who sheltered in the cellar.\n\nHistorical fact: Heavy Rescue Squads were specialist teams trained to find and extract survivors from bombed buildings. They worked in extremely dangerous conditions, with unstable structures threatening to collapse at any moment.\n\nThe barman shakes your hand. \"Same time tomorrow, then?\" he says with a grim smile. London's dark humor keeps everyone going.\n\nKEY LESSONS:\n• The Blitz lasted from September 1940 to May 1941 — 8 months of sustained bombing\n• Over 30,000 bombs fell on London alone\n• Civilian courage and community spirit were as important as military defense\n• The Blitz failed to break British morale — it strengthened resolve instead\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      },
      ration_queue: {
        text: "You queue for two hours at the grocer's. Rationing is strict — each person gets only a few ounces of meat, sugar, and butter per week. But nobody complains.\n\nHistorical fact: Rationing in Britain began in January 1940 and continued until 1954 — nine years after the war ended. Despite the restrictions, the health of the British population actually improved during rationing because food was distributed more fairly.\n\nA woman in the queue shares her recipe for carrot cake — made without sugar. \"We make do,\" she says. And you do.\n\nKEY LESSONS:\n• The Blitz lasted from September 1940 to May 1941 — 8 months of sustained bombing\n• Over 30,000 bombs fell on London alone\n• Civilian courage and community spirit were as important as military defense\n• The Blitz failed to break British morale — it strengthened resolve instead\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      },
      write_letter: {
        text: "You sit at the kitchen table and write to your father. You tell him the family is safe. You don't mention the fear, the sleepless nights, the house three doors down that no longer exists.\n\n\"We're all fine, Dad. London's still standing. Come home soon.\"\n\nHistorical fact: Millions of letters were sent between soldiers abroad and their families during the war. Censors reviewed outgoing military mail, but letters from home were a crucial morale boost for troops.\n\nYou post the letter and head back to prepare for another night.\n\nKEY LESSONS:\n• The Blitz lasted from September 1940 to May 1941 — 8 months of sustained bombing\n• Over 30,000 bombs fell on London alone\n• Civilian courage and community spirit were as important as military defense\n• The Blitz failed to break British morale — it strengthened resolve instead\n\nThank you for experiencing this chapter of history.",
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
  },

  egypt: {
    title: "THE SUEZ CRISIS",
    year: "1956",
    intro: "July 1956. Egyptian President Gamal Abdel Nasser has nationalized the Suez Canal, defying Britain and France. The world watches as a confrontation brews that will reshape the Middle East. You are an Egyptian dock worker in Port Said, living at the crossroads of empire and independence.",
    nodes: {
      start: {
        text: "You work loading cargo ships at the Suez Canal in Port Said. Today the radio crackles with Nasser's voice — he has just announced the nationalization of the canal. Your coworkers erupt in celebration.\n\n\"Egypt for the Egyptians!\" your foreman shouts. \"No more British telling us what to do on our own land!\"\n\nHistorical fact: The Suez Canal was built between 1859 and 1869, largely with Egyptian forced labor. Despite being on Egyptian soil, it was controlled by the Suez Canal Company, majority-owned by British and French shareholders.\n\nBut your neighbor, an older man who survived the 1948 war, pulls you aside. \"This will mean war. Britain and France will not let this stand. You must prepare your family.\"",
        choices: [
          { text: "JOIN THE VOLUNTEER CIVIL DEFENSE FORCE", next: "civil_defense" },
          { text: "PREPARE YOUR FAMILY TO EVACUATE PORT SAID", next: "prepare_evacuate" }
        ]
      },
      civil_defense: {
        text: "You join thousands of Egyptian volunteers training to defend Port Said. The Egyptian military distributes old rifles and teaches basic first aid. The mood is defiant but nervous.\n\nHistorical fact: After nationalization, Britain, France, and Israel secretly colluded in the Protocol of Sevres — a plan for Israel to invade the Sinai, giving Britain and France a pretext to intervene and seize the canal.\n\nWeeks pass. Then on October 29, 1956, Israeli forces invade the Sinai Peninsula. Two days later, British and French planes begin bombing Egyptian airfields.\n\nYour unit commander gathers everyone. \"They are bombing Cairo and Alexandria. Port Said will be next. We must defend our city.\"",
        choices: [
          { text: "TAKE A POSITION DEFENDING THE HARBOR", next: "defend_harbor" },
          { text: "HELP ORGANIZE CIVILIAN SHELTERS", next: "civilian_shelters" }
        ]
      },
      prepare_evacuate: {
        text: "You begin moving your family — your wife, two young children, and elderly mother — to your cousin's home in Cairo. The roads are crowded with others who sense what is coming.\n\nHistorical fact: President Nasser sank 40 ships in the Suez Canal to block it after the invasion began. This denied Europe a critical shipping route and caused an oil crisis that pressured Britain and France to withdraw.\n\nYou get your family to Cairo safely, but you feel torn. Your friends and neighbors in Port Said are in danger. Radio reports say British and French warships are approaching.\n\nYour wife sees the conflict in your eyes. \"Go back if you must. We will be safe here.\"",
        choices: [
          { text: "RETURN TO PORT SAID TO HELP", next: "defend_harbor" },
          { text: "STAY IN CAIRO AND VOLUNTEER AT A HOSPITAL", next: "cairo_hospital" }
        ]
      },
      defend_harbor: {
        text: "On November 5, 1956, British and French paratroopers drop onto Port Said. Naval bombardment shakes the city. You and other volunteers take positions behind barricades.\n\nThe professional armies are overwhelmingly powerful, but the people of Port Said resist fiercely. Women carry ammunition. Teenagers throw stones. Old men fire hunting rifles.\n\nHistorical fact: The Battle of Port Said lasted two days. Egyptian military casualties were around 650-1,000 killed, with an estimated 1,000 civilian deaths. The fierce resistance became a symbol of Egyptian determination.\n\nAs buildings crumble around you, word comes through the radio that the United Nations is demanding a ceasefire.",
        choices: [
          { text: "HOLD YOUR POSITION UNTIL THE CEASEFIRE", next: "ceasefire" },
          { text: "HELP RESCUE CIVILIANS TRAPPED IN RUBBLE", next: "rescue_civilians" }
        ]
      },
      civilian_shelters: {
        text: "You help convert basements and sturdy buildings into shelters. You stockpile water, bandages, and food. When the bombing starts, hundreds of families crowd into the shelters you prepared.\n\nHistorical fact: Port Said suffered extensive damage during the Anglo-French bombardment. The city's civilian infrastructure — hospitals, schools, homes — was hit alongside military targets.\n\nChildren cry in the darkness as explosions shake the walls. You do your best to keep people calm, telling them Egypt will prevail. Then the shelling intensifies.",
        choices: [
          { text: "VENTURE OUT TO FIND MORE MEDICAL SUPPLIES", next: "rescue_civilians" },
          { text: "STAY AND KEEP THE SHELTER ORGANIZED", next: "ceasefire" }
        ]
      },
      cairo_hospital: {
        text: "You volunteer at a Cairo hospital overwhelmed with wounded soldiers evacuated from the Sinai front. You carry stretchers, clean wounds, and comfort the dying.\n\nHistorical fact: The Suez Crisis marked the end of Britain and France as dominant world powers. The United States and Soviet Union — both opposing the invasion — forced a withdrawal, demonstrating that a new world order had arrived.\n\nPresident Eisenhower of the United States threatens economic sanctions against Britain. The Soviet Union issues even darker warnings. The pressure works.",
        choices: [
          { text: "CONTINUE HELPING AT THE HOSPITAL", next: "ceasefire" }
        ]
      },
      rescue_civilians: {
        text: "You crawl through rubble-strewn streets to reach a collapsed apartment building. Inside, you can hear a family calling for help. With other volunteers, you dig with bare hands for hours.\n\nYou pull out a mother and her three children, alive. The father did not survive.\n\nHistorical fact: The international community was overwhelmingly opposed to the invasion. The UN General Assembly voted 64-5 to demand a ceasefire, and the first-ever UN Emergency Force (UNEF) was created to oversee the withdrawal.\n\nThe ceasefire finally comes. The guns fall silent.",
        choices: [
          { text: "CONTINUE", next: "ceasefire" }
        ]
      },
      ceasefire: {
        text: "On November 7, 1956, a ceasefire takes effect. By December, under immense international pressure, Britain, France, and Israel begin withdrawing. UN peacekeepers arrive.\n\nNasser emerges as a hero across the Arab world. Egypt keeps the canal. The old colonial powers have been humbled.\n\nYou stand at the Port Said waterfront, watching the last foreign soldiers leave. An old dockworker beside you weeps. \"I never thought I would see the day. The canal is ours.\"\n\nKEY LESSONS:\n• The Suez Crisis ended British and French colonial dominance in the Middle East\n• It established the United States and Soviet Union as the world's primary powers\n• The UN Emergency Force was the first peacekeeping mission of its kind\n• Egyptian resistance at Port Said became a symbol of anti-colonial struggle worldwide\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  usa: {
    title: "THE ATTACK ON PEARL HARBOR",
    year: "1941",
    intro: "December 7, 1941. A quiet Sunday morning in Hawaii is about to become 'a date which will live in infamy.' The Imperial Japanese Navy is launching a surprise attack on the American naval base at Pearl Harbor. You are a young Navy mechanic stationed at Hickam Field.",
    nodes: {
      start: {
        text: "It is 7:48 AM on a beautiful Hawaiian morning. You are eating breakfast in the mess hall at Hickam Field, the Army Air Corps base adjacent to Pearl Harbor. Your buddy Ray sits across from you.\n\n\"What do you want to do today? Maybe hit Waikiki beach after —\"\n\nA deafening roar drowns out his voice. Through the window, you see dozens of planes with red circles on their wings diving toward the harbor. Explosions erupt across the water. The battleships are being hit.\n\n\"Those are Japanese planes!\" someone screams.\n\nHistorical fact: The attack on Pearl Harbor involved 353 Japanese aircraft launched from six aircraft carriers. The first wave struck at 7:48 AM, achieving complete tactical surprise.",
        choices: [
          { text: "RUN TO THE FLIGHT LINE TO SAVE THE PLANES", next: "flight_line" },
          { text: "HEAD TO THE HARBOR TO HELP THE SAILORS", next: "harbor_rescue" }
        ]
      },
      flight_line: {
        text: "You sprint toward the aircraft hangars. American planes are lined up wingtip to wingtip — easy targets. Japanese fighters are strafing them, and several are already burning.\n\nHistorical fact: American aircraft at Hickam Field and other bases were parked close together as a precaution against sabotage, not air attack. This made them easy targets. The US lost 188 aircraft destroyed and 159 damaged.\n\nYou reach a P-40 fighter that hasn't been hit yet. It has ammunition but no time to arm it properly. A pilot appears, shouting that he needs a plane — any plane.\n\nAnother mechanic yells that the fire in Hangar 7 is spreading toward stored ammunition.",
        choices: [
          { text: "HELP THE PILOT GET THE P-40 IN THE AIR", next: "get_plane_up" },
          { text: "FIGHT THE HANGAR FIRE BEFORE THE AMMO EXPLODES", next: "fight_fire" }
        ]
      },
      harbor_rescue: {
        text: "You race toward Pearl Harbor. The scene is apocalyptic. Battleship Row is engulfed in flames and black smoke. The USS Arizona has exploded — a massive fireball rises into the sky.\n\nHistorical fact: The USS Arizona was hit by a 1,760-pound armor-piercing bomb that detonated its forward ammunition magazine. The explosion killed 1,177 crew members — nearly half of the total American deaths that day.\n\nSailors are in the water, covered in oil. Some are burning. Small boats are pulling survivors from the harbor. A chief petty officer shouts at you from a launch: \"Get in! We need every hand!\"",
        choices: [
          { text: "JOIN THE RESCUE BOATS PULLING SAILORS FROM THE WATER", next: "water_rescue" },
          { text: "HELP THE WOUNDED ON THE SHORE", next: "shore_medical" }
        ]
      },
      get_plane_up: {
        text: "You work frantically to prep the P-40. Japanese Zeros strafe the field around you — bullets kick up dirt just yards away. You get the engine started and the pilot climbs in.\n\nHe takes off into a sky full of enemy planes. He is one of only a handful of American pilots who get airborne during the attack.\n\nHistorical fact: Lieutenants George Welch and Kenneth Taylor managed to get their P-40s airborne from Haleiwa Field and shot down several Japanese planes. They were among the few Americans who fought back in the air that morning.\n\nThe second wave of Japanese planes arrives. You take cover behind a concrete revetment as bombs fall around you.",
        choices: [
          { text: "HELP ARM AND FUEL MORE PLANES", next: "second_wave" }
        ]
      },
      fight_fire: {
        text: "You grab a fire extinguisher and join a chain of men fighting the hangar fire. The heat is unbearable. Japanese planes continue strafing, and the man next to you is hit.\n\nYou drag him to cover, then go back to fight the fire. If the ammunition stores go up, it will kill everyone nearby.\n\nHistorical fact: Hickam Field suffered 189 killed and 303 wounded during the attack. Despite the chaos, servicemen and civilians showed extraordinary courage, fighting fires and rescuing the wounded under continuous enemy fire.\n\nYou and the others manage to push back the flames just enough to save the ammunition stores.",
        choices: [
          { text: "CONTINUE HELPING THROUGH THE SECOND WAVE", next: "second_wave" }
        ]
      },
      water_rescue: {
        text: "You pull oil-soaked sailors from the burning water. Many are badly burned. Some are unconscious. You make trip after trip in the small boat, ferrying the wounded to shore.\n\nThe water itself is on fire in places — fuel oil from the ruptured ships burns on the surface. You have to navigate through gaps in the flames.\n\nHistorical fact: The harbor was so filled with burning oil that many sailors who survived the initial explosions died in the water. Rescue crews worked for hours under continuous attack, saving hundreds of lives.\n\nYou personally help pull 15 men from the water before the second wave hits.",
        choices: [
          { text: "KEEP RESCUING THROUGH THE SECOND WAVE", next: "second_wave" }
        ]
      },
      shore_medical: {
        text: "The base hospital is overwhelmed. Wounded are laid out on the lawn, in hallways, everywhere. You have no medical training, but a nurse hands you bandages. \"Apply pressure to any wound that's bleeding. Don't let anyone fall asleep if they have a head injury.\"\n\nHistorical fact: Nurses and medical staff at Pearl Harbor performed heroically during and after the attack. The hospital had 91 beds but treated over 500 casualties. Civilian volunteers from Honolulu also rushed to help.\n\nYou do what you can — holding hands, applying bandages, carrying stretchers. Some men die despite your efforts. Others survive because of them.",
        choices: [
          { text: "CONTINUE THROUGH THE SECOND WAVE", next: "second_wave" }
        ]
      },
      second_wave: {
        text: "The second wave of Japanese planes hits at 8:54 AM. More explosions. More fire. More death. But this time, Americans are fighting back — anti-aircraft guns are now manned and firing.\n\nBy 10:00 AM, it is over. The Japanese planes withdraw. Pearl Harbor is a smoking ruin. Eight battleships are damaged or sunk. 2,403 Americans are dead.\n\nYou sit in the ash and silence, stunned. Then the anger comes.\n\nHistorical fact: The next day, President Roosevelt addressed Congress, calling December 7 'a date which will live in infamy.' Congress declared war on Japan with only one dissenting vote. The United States had entered World War II.\n\nNothing will ever be the same.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      ending: {
        text: "Pearl Harbor transformed the United States overnight. A nation divided over isolationism united in fury and purpose. Within four years, that fury would end the war — but at an immense cost.\n\nYou survived the attack. Like millions of Americans, the war would define the rest of your life.\n\nKEY LESSONS:\n• The attack killed 2,403 Americans and destroyed much of the Pacific Fleet\n• Despite the devastation, the aircraft carriers — out at sea that day — survived, proving decisive later\n• Pearl Harbor ended American isolationism and brought the US into World War II\n• The attack demonstrated how surprise and complacency can have catastrophic consequences\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  argentina: {
    title: "THE FALKLANDS WAR",
    year: "1982",
    intro: "April 1982. Argentina's military junta has invaded the Falkland Islands, a remote British territory in the South Atlantic. Amid economic crisis and political repression at home, the generals gamble on a war to rally the nation. You are a young Argentine conscript, barely 19, sent to the islands you were told were rightfully yours.",
    nodes: {
      start: {
        text: "You were drafted six months ago. Now you stand on the windswept Falkland Islands — the Malvinas, as you were taught to call them. Your sergeant hands you a rifle older than your father.\n\n\"The British won't come,\" he says confidently. \"They're 8,000 miles away. This is a political move. We'll be home by May.\"\n\nBut your corporal, a quieter man, shakes his head. He points to the horizon. \"They'll come.\"\n\nHistorical fact: The Argentine military junta, led by General Leopoldo Galtieri, invaded the Falklands on April 2, 1982, partly to distract from a severe economic crisis and widespread human rights abuses during the 'Dirty War.'\n\nYou are assigned to dig trenches on the hills above Stanley, the islands' capital.",
        choices: [
          { text: "DIG IN AND PREPARE YOUR DEFENSES AS ORDERED", next: "dig_in" },
          { text: "BEFRIEND THE LOCAL ISLANDERS TO LEARN THE TERRAIN", next: "befriend_locals" }
        ]
      },
      dig_in: {
        text: "You dig trenches in the peat bogs. The wind is relentless and freezing. Your equipment is poor — your boots leak, your uniform is designed for Buenos Aires summers, not South Atlantic winters. Food is scarce.\n\nHistorical fact: Many Argentine conscripts were poorly trained teenagers from warm northern provinces. They suffered from exposure, malnutrition, and frostbite. Some soldiers were as young as 18 and had only weeks of basic training.\n\nWeeks pass. Then the British task force arrives — aircraft carriers, destroyers, and thousands of Royal Marines and paratroopers. The bombing begins.\n\nYour sergeant's confidence has vanished. He looks as scared as you feel.",
        choices: [
          { text: "HOLD YOUR POSITION AS THE BRITISH ADVANCE", next: "battle_goose_green" },
          { text: "TRY TO HELP YOUR SICK AND FREEZING COMRADES", next: "help_comrades" }
        ]
      },
      befriend_locals: {
        text: "You approach a Falkland Islander family, the Smiths, who eye you with suspicion and fear. But you offer to share your rations — meager as they are — and help fix their fence damaged in the invasion.\n\nMrs. Smith is cold at first, but her young son starts talking to you. You show him photos of your family back in Cordoba.\n\nHistorical fact: The Falkland Islanders were overwhelmingly British in identity and culture. Only about 1,800 people lived on the islands at the time of the invasion. They did not want Argentine rule.\n\n\"You seem like a good lad,\" Mr. Smith says quietly. \"But you shouldn't be here. None of you should. This won't end well.\"\n\nHe is right. British warships appear on the horizon.",
        choices: [
          { text: "RETURN TO YOUR UNIT AS THE FIGHTING BEGINS", next: "battle_goose_green" },
          { text: "HELP THE SMITH FAMILY PREPARE FOR THE BATTLE", next: "protect_civilians" }
        ]
      },
      battle_goose_green: {
        text: "The Battle of Goose Green begins on May 28. British paratroopers advance against your positions. The fighting is intense and terrifying. Artillery shells explode around your trench.\n\nThe soldier next to you, Miguel, a farm boy from Tucuman, is shaking. \"I don't want to die here,\" he whispers. \"I don't even know why we're here.\"\n\nHistorical fact: The Battle of Goose Green was the first major land battle of the war. 17 British and 47 Argentine soldiers were killed. The British commander, Colonel H. Jones, was killed leading a charge and posthumously awarded the Victoria Cross.\n\nAfter hours of fighting, word comes that your unit must withdraw toward Stanley.",
        choices: [
          { text: "RETREAT IN ORDER TOWARD STANLEY", next: "retreat_stanley" },
          { text: "STAY BEHIND TO COVER YOUR COMRADES' RETREAT", next: "cover_retreat" }
        ]
      },
      help_comrades: {
        text: "Several soldiers in your unit have trench foot from the constant wet and cold. One, barely 18, has frostbitten toes that are turning black. You share your dry socks and give him your extra ration.\n\nHistorical fact: Argentine soldiers suffered severely from exposure and malnutrition. Many officers hoarded supplies while conscripts starved. After the war, several Argentine conscripts testified about abuse by their own officers — some were staked out in the cold as punishment.\n\nThe British attack comes while you're helping carry a sick soldier to the field hospital. Explosions light up the night.",
        choices: [
          { text: "GET YOUR COMRADE TO THE HOSPITAL AND RETURN TO FIGHT", next: "retreat_stanley" }
        ]
      },
      protect_civilians: {
        text: "You help the Smith family secure their home and move their sheep to a safer paddock. When the shelling starts, you guide them to their root cellar.\n\n\"Thank you,\" Mrs. Smith says, pressing a cup of tea into your hands. \"Whatever happens, I'll remember that not all of you chose this.\"\n\nHistorical fact: Three Falkland Islander civilians were killed during the war. The British military made significant efforts to minimize civilian casualties. Most islanders sheltered in their homes during the fighting.\n\nYou return to your unit as the British forces close in on Stanley.",
        choices: [
          { text: "REJOIN YOUR UNIT FOR THE FINAL BATTLE", next: "retreat_stanley" }
        ]
      },
      cover_retreat: {
        text: "You and a handful of soldiers stay in your trenches to slow the British advance. It is the most terrifying hours of your life. You fire into the darkness, not knowing if you're hitting anything.\n\nWhen you finally pull back, you carry a wounded comrade on your back for two miles across the boggy terrain.\n\nHistorical fact: Many Argentine soldiers showed great courage despite their poor equipment and leadership. The Argentine Air Force, in particular, performed with remarkable bravery, sinking several British ships with daring low-level attacks.\n\nYou reach the outskirts of Stanley, exhausted and freezing.",
        choices: [
          { text: "CONTINUE", next: "retreat_stanley" }
        ]
      },
      retreat_stanley: {
        text: "The final British assault on Stanley begins on June 11. Mount Longdon, Two Sisters, Mount Tumbledown — the hills around the capital fall one by one. The fighting is fierce and close.\n\nBy June 14, it is over. Your commanding officer announces the surrender. Argentine soldiers lay down their weapons. Some weep. Some feel relief. You feel numb.\n\nHistorical fact: The Falklands War lasted 74 days. 649 Argentine military personnel, 255 British military personnel, and 3 Falkland Islanders were killed. Argentina's defeat led to the fall of the military junta and a return to democracy.\n\nYou are taken prisoner. A British soldier offers you a cigarette and a blanket. \"Rough business, this,\" he says quietly.\n\nKEY LESSONS:\n• The war was started by a military dictatorship trying to distract from domestic failures\n• Young conscripts on both sides paid the price for political decisions\n• Argentina's defeat led to the end of military rule and restoration of democracy in 1983\n• The war showed that colonial disputes could still erupt into modern warfare\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  southafrica: {
    title: "THE STRUGGLE AGAINST APARTHEID",
    year: "1960-1990",
    intro: "South Africa, 1976. The apartheid government enforces brutal racial segregation — separate schools, separate neighborhoods, separate lives. Black South Africans are denied basic rights in the land of their birth. You are a young Black student in Soweto, and the government has just decreed that all classes must be taught in Afrikaans — the language of the oppressor.",
    nodes: {
      start: {
        text: "Your school is buzzing with anger. The new Afrikaans language decree means your teachers — who speak Zulu, Sotho, and English — must now teach mathematics and history in Afrikaans, a language none of you speak well.\n\n\"They want to make us stupid,\" your classmate Thabo says. \"They want to destroy our education so we can only be laborers.\"\n\nStudents are organizing a protest march for June 16. Thousands plan to walk peacefully through Soweto.\n\nHistorical fact: Afrikaans was seen as the language of the apartheid oppressor. The Bantu Education Act of 1953 had already created a deliberately inferior education system for Black South Africans, designed to prepare them only for menial labor.\n\nYour mother begs you not to go. \"The police will shoot. They always shoot.\"",
        choices: [
          { text: "JOIN THE STUDENT MARCH ON JUNE 16", next: "join_march" },
          { text: "STAY HOME BUT HELP ORGANIZE SECRETLY", next: "organize_secretly" }
        ]
      },
      join_march: {
        text: "On the morning of June 16, 1976, you join thousands of students marching through Soweto. The mood is determined but peaceful. Students sing freedom songs and carry signs reading \"Down with Afrikaans\" and \"We are not Boers.\"\n\nThen the police arrive with armored vehicles. Without warning, they fire tear gas into the crowd of children. Then they open fire with live ammunition.\n\nHistorical fact: The first student killed was 12-year-old Hector Pieterson, whose body was carried by a fellow student in a photograph that shocked the world. The official death toll was 176, but many believe hundreds more were killed in the days of unrest that followed.\n\nPandemonium erupts. Children scatter. You see a younger student fall, wounded.",
        choices: [
          { text: "CARRY THE WOUNDED STUDENT TO SAFETY", next: "carry_wounded" },
          { text: "HELP LEAD OTHER STUDENTS AWAY FROM THE GUNFIRE", next: "lead_away" }
        ]
      },
      organize_secretly: {
        text: "You help distribute pamphlets and organize safe houses. When the march happens and the massacre follows, you help coordinate medical aid for the wounded from a church basement.\n\nHistorical fact: The Soweto Uprising of 1976 was a turning point in the anti-apartheid struggle. It galvanized international opposition to apartheid and inspired a new generation of young activists who would not accept the system their parents had endured.\n\nIn the aftermath, the government cracks down hard. Students are arrested, beaten, and detained without trial. The resistance goes underground.",
        choices: [
          { text: "JOIN THE UNDERGROUND RESISTANCE MOVEMENT", next: "underground" },
          { text: "WORK WITH CHURCHES TO DOCUMENT ABUSES", next: "document_abuses" }
        ]
      },
      carry_wounded: {
        text: "You lift the young girl onto your back and run. Bullets crack past you. You reach a house where a woman opens the door and pulls you both inside.\n\nThe girl survives. Her name is Nomsa. She is thirteen.\n\nHistorical fact: Many Soweto residents opened their homes as emergency shelters and medical stations. The community's response showed extraordinary solidarity in the face of state violence.\n\nIn the weeks that follow, the uprising spreads across South Africa. The apartheid government responds with mass arrests and more violence. You must decide your next step.",
        choices: [
          { text: "JOIN THE UNDERGROUND RESISTANCE MOVEMENT", next: "underground" },
          { text: "FLEE TO A NEIGHBORING COUNTRY TO JOIN THE ANC IN EXILE", next: "exile" }
        ]
      },
      lead_away: {
        text: "You grab younger students and guide them through backyard shortcuts you know from growing up in Soweto. You lead about thirty children to a community church where they can shelter.\n\nThe pastor locks the doors as police vehicles roar past outside. For hours, you hear gunshots and screams.\n\nHistorical fact: The apartheid police used live ammunition, tear gas, and armored vehicles against unarmed schoolchildren. The youngest victims were under ten years old. The brutality was broadcast around the world.\n\nWhen it is finally safe to leave, you emerge into a changed Soweto — and a changed South Africa.",
        choices: [
          { text: "JOIN THE UNDERGROUND RESISTANCE MOVEMENT", next: "underground" },
          { text: "WORK WITH CHURCHES TO DOCUMENT ABUSES", next: "document_abuses" }
        ]
      },
      underground: {
        text: "You connect with the African National Congress underground network. You distribute banned literature, organize stay-away strikes, and help hide activists wanted by the police.\n\nThe years are long and dangerous. Friends disappear into detention. Some never return. The Security Branch watches everyone.\n\nHistorical fact: Nelson Mandela had been imprisoned on Robben Island since 1964. From his cell, he remained the symbolic leader of the anti-apartheid movement. The campaign to free Mandela became a global cause.\n\nBy the late 1980s, international sanctions are crippling the economy. The government is under pressure from all sides.",
        choices: [
          { text: "PARTICIPATE IN THE MASS DEMOCRATIC MOVEMENT PROTESTS", next: "final_push" }
        ]
      },
      exile: {
        text: "You cross the border into Botswana and eventually reach an ANC training camp in Tanzania. You train alongside other exiles from across South Africa — students, workers, teachers — all united against apartheid.\n\nHistorical fact: Tens of thousands of young South Africans went into exile after 1976. The ANC operated training camps and offices across Africa and Europe. The exile community kept international pressure on the apartheid government.\n\nYears pass. You work in the ANC's information department, telling the world about apartheid's crimes. Then, in 1990, everything changes.",
        choices: [
          { text: "RETURN HOME WHEN MANDELA IS FREED", next: "final_push" }
        ]
      },
      document_abuses: {
        text: "Working with church leaders like Archbishop Desmond Tutu, you help document disappearances, torture, and killings by the apartheid security forces. Your reports are smuggled to the international press.\n\nHistorical fact: Archbishop Desmond Tutu won the Nobel Peace Prize in 1984 for his nonviolent opposition to apartheid. Religious leaders played a crucial role in the struggle, providing moral authority and international visibility.\n\nThe documentation helps fuel the global anti-apartheid movement. Countries begin imposing sanctions on South Africa.",
        choices: [
          { text: "CONTINUE THE FIGHT INTO THE 1980S", next: "final_push" }
        ]
      },
      final_push: {
        text: "On February 11, 1990, Nelson Mandela walks free after 27 years in prison. You watch on television, weeping with millions of others.\n\nThe negotiations are long and difficult. Violence continues. But on April 27, 1994, South Africans of all races vote together for the first time. The lines stretch for miles. Old women who never dreamed of voting wait for hours in the sun.\n\nYou cast your vote. Your hand trembles as you mark the ballot.\n\nHistorical fact: The 1994 election saw 19.7 million South Africans vote. Nelson Mandela and the ANC won with 62% of the vote. Mandela became the first Black president of South Africa.\n\nKEY LESSONS:\n• Apartheid lasted from 1948 to 1994 — 46 years of institutionalized racial oppression\n• The Soweto Uprising of 1976 was a turning point driven by young students\n• International sanctions and internal resistance together forced the end of apartheid\n• South Africa's Truth and Reconciliation Commission became a model for post-conflict justice\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  australia: {
    title: "THE GALLIPOLI CAMPAIGN",
    year: "1915",
    intro: "April 1915. The British Empire has devised a bold plan to knock the Ottoman Empire out of World War I by seizing the Gallipoli peninsula and opening a sea route to Russia. Thousands of young Australians and New Zealanders — the ANZACs — have volunteered to fight. You are one of them, a farm boy from rural Queensland who has never left Australia before.",
    nodes: {
      start: {
        text: "You trained in Egypt, where the heat and sand felt nothing like home. Now you're packed into a transport ship approaching the Gallipoli coast in the pre-dawn darkness of April 25, 1915.\n\nThe bloke next to you, a shearer named Bluey from Longreach, grins nervously. \"Reckon it'll be over by Christmas, mate?\"\n\nHistorical fact: The Gallipoli Campaign was the brainchild of Winston Churchill, then First Lord of the Admiralty. The plan aimed to capture Constantinople (Istanbul) and open a supply route to Russia through the Dardanelles strait.\n\nYour sergeant gathers the platoon. \"We're landing at dawn. The Turks don't know we're coming. Get in the boats, keep your heads down, and when you hit the beach — run.\"\n\nBut as the boats approach shore, you realize something is wrong. This isn't the planned landing beach. Steep cliffs loom above you.",
        choices: [
          { text: "CHARGE UP THE CLIFFS WITH THE FIRST WAVE", next: "charge_cliffs" },
          { text: "HELP ORGANIZE THE CHAOTIC LANDING ON THE BEACH", next: "organize_beach" }
        ]
      },
      charge_cliffs: {
        text: "You scramble out of the boat into chest-deep water. Machine gun fire rips across the beach from above. Men fall around you. You claw your way up the steep scrub-covered slopes.\n\nHistorical fact: The ANZACs landed at the wrong beach — a narrow cove backed by steep ridges instead of the planned flat beach further south. This area became known as ANZAC Cove. The landing error put them directly beneath well-defended Turkish positions.\n\nYou reach a narrow ridge. Turkish soldiers are dug in above you. The fighting is hand-to-hand in places. By noon, the ANZACs hold a tiny, precarious foothold.\n\nWord comes that the commanders are considering evacuation.",
        choices: [
          { text: "DIG IN AND HOLD THE RIDGE", next: "dig_in_ridge" },
          { text: "VOLUNTEER TO CARRY WOUNDED DOWN TO THE BEACH", next: "carry_wounded_beach" }
        ]
      },
      organize_beach: {
        text: "The beach is chaos. Boats land in the wrong spots. Units are mixed together. Officers are killed or separated from their men. You help a group of lost soldiers find their company and direct stretcher-bearers to the wounded.\n\nHistorical fact: On the first day alone, the ANZACs suffered over 2,000 casualties. Despite the confusion, the troops pushed inland with remarkable determination, though they never achieved their first-day objectives.\n\nBy afternoon, the beach is under constant shrapnel fire. A medical officer sets up a dressing station behind a sand dune and calls for help.",
        choices: [
          { text: "HELP AT THE MEDICAL STATION", next: "medical_station" },
          { text: "JOIN THE FIGHTING ON THE RIDGES ABOVE", next: "dig_in_ridge" }
        ]
      },
      dig_in_ridge: {
        text: "You dig a shallow trench with your entrenching tool. The Turkish trenches are sometimes only yards away — close enough to throw a grenade. The fighting becomes a brutal stalemate.\n\nDays turn into weeks. Weeks turn into months. The heat is unbearable. Flies swarm the dead. Dysentery sweeps through the trenches.\n\nHistorical fact: The Gallipoli trenches were among the closest of any in World War I, sometimes only 15 meters apart. The campaign devolved into trench warfare similar to the Western Front, but with the added hardship of extreme heat, limited water, and constant disease.\n\nBluey, your mate from the ship, catches dysentery. He can barely stand but refuses to leave the line.",
        choices: [
          { text: "INSIST BLUEY GO TO THE FIELD HOSPITAL", next: "field_hospital" },
          { text: "SHARE YOUR WATER RATION AND KEEP HIM ON THE LINE", next: "august_offensive" }
        ]
      },
      carry_wounded_beach: {
        text: "You spend the day carrying wounded men down the cliffs on stretchers. It is backbreaking and heartbreaking work. Some men die on the stretcher before you reach the beach.\n\nHistorical fact: John Simpson Kirkpatrick, an ANZAC stretcher-bearer, used a donkey to carry wounded soldiers down from the ridges. He worked for 24 days under constant fire before being killed. He became one of Australia's most celebrated war heroes.\n\nYou work alongside a man with a donkey who carries wounded with quiet determination. He nods at you. \"Another trip, mate. Always another trip.\"",
        choices: [
          { text: "CONTINUE STRETCHER-BEARING THROUGH THE CAMPAIGN", next: "august_offensive" }
        ]
      },
      medical_station: {
        text: "You help the medical officer treat wounds you never imagined. Shrapnel, bullets, bayonet wounds. There is not enough morphine, not enough bandages, not enough of anything.\n\nHistorical fact: Medical conditions at Gallipoli were horrendous. Disease killed more soldiers than combat. Dysentery, typhoid, and enteric fever were rampant due to poor sanitation, contaminated water, and the inability to bury the dead in no-man's-land.\n\nA hospital ship takes the worst cases to Egypt. Those who can stand go back to the line.",
        choices: [
          { text: "RETURN TO THE FIGHTING LINE", next: "august_offensive" }
        ]
      },
      field_hospital: {
        text: "You half-carry Bluey down to the beach hospital. He protests the whole way. \"I'm right, mate. Put me down. The boys need me.\"\n\nThe doctor takes one look and shakes his head. Bluey is evacuated to a hospital ship.\n\nHistorical fact: Over 26,000 ANZACs were evacuated due to illness during the campaign — far more than were wounded in battle. Dysentery alone incapacitated thousands of soldiers.\n\nYou return to the trenches alone. The line feels emptier every day.",
        choices: [
          { text: "CONTINUE FIGHTING", next: "august_offensive" }
        ]
      },
      august_offensive: {
        text: "In August, the Allies launch a major offensive to break the stalemate. The assault on Lone Pine and Chunuk Bair becomes some of the fiercest fighting of the campaign.\n\nYou advance through scrub under heavy fire. The Turkish defenders fight with equal courage and determination.\n\nHistorical fact: The August Offensive was the last major attempt to break through at Gallipoli. It failed with heavy losses on both sides. Turkish commander Mustafa Kemal (later Ataturk, founder of modern Turkey) led the defense that held the heights.\n\nBy October, it is clear the campaign has failed. Rumors of evacuation spread through the trenches.",
        choices: [
          { text: "CONTINUE TO THE EVACUATION", next: "evacuation" }
        ]
      },
      evacuation: {
        text: "In December 1915, the order comes to evacuate. Ironically, the evacuation is the most successful operation of the entire campaign — carried out in secrecy without a single casualty.\n\nYou leave the trenches at night, walking silently past the graves of your mates. You board a boat and look back at the cliffs one last time. Eight months of hell, and nothing was gained.\n\nHistorical fact: The Gallipoli Campaign resulted in approximately 44,000 Allied deaths (including 8,709 Australians) and 86,000 Ottoman deaths. The campaign failed to achieve any of its objectives.\n\nKEY LESSONS:\n• Gallipoli was a catastrophic military failure born of overconfidence and poor planning\n• April 25 — ANZAC Day — became Australia and New Zealand's most sacred day of remembrance\n• The campaign forged a sense of national identity for both Australia and Turkey\n• Turkish soldiers fought with equal courage defending their homeland under Mustafa Kemal\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  indonesia: {
    title: "THE INDONESIAN WAR OF INDEPENDENCE",
    year: "1945-1949",
    intro: "August 1945. Japan has just surrendered, ending World War II. For three and a half years, the Dutch East Indies has been under Japanese occupation. Now the Dutch want their colony back — but Indonesian nationalists have other ideas. You are a young Indonesian in Surabaya, East Java, on the cusp of freedom.",
    nodes: {
      start: {
        text: "Two days after Japan's surrender, Sukarno and Mohammad Hatta proclaim Indonesian independence on August 17, 1945. The red and white flag flies over Jakarta for the first time. Your neighborhood erupts in celebration.\n\nBut the joy is mixed with fear. Japanese soldiers still patrol the streets, and British troops are coming to disarm them. Behind the British will come the Dutch, who want to reclaim their colony.\n\nHistorical fact: The Dutch had colonized Indonesia for over 300 years. During this time, they exploited the islands' vast resources — spices, rubber, oil — while denying Indonesians basic political rights and education.\n\nYour older brother Budi, a pemuda (young revolutionary), grabs your arm. \"We must arm ourselves. The Dutch will never grant us freedom. We must take it.\"",
        choices: [
          { text: "JOIN THE PEMUDA REVOLUTIONARY FIGHTERS", next: "join_pemuda" },
          { text: "WORK WITH SUKARNO'S DIPLOMATIC EFFORT", next: "diplomatic_path" }
        ]
      },
      join_pemuda: {
        text: "You join thousands of young Indonesians seizing weapons from the surrendering Japanese. Some Japanese soldiers hand over their weapons willingly, sympathetic to Indonesian independence. Others resist.\n\nHistorical fact: After Japan's surrender, Indonesian nationalists seized Japanese weapons and formed militia groups. These poorly equipped but passionate fighters became the backbone of the independence struggle.\n\nOn October 25, 1945, British Indian troops arrive in Surabaya to accept the Japanese surrender. But tensions escalate rapidly. The British commander, Brigadier Mallaby, is killed during a confrontation.\n\nThe British issue an ultimatum: surrender all weapons or face attack.",
        choices: [
          { text: "REFUSE TO SURRENDER AND PREPARE TO FIGHT", next: "battle_surabaya" },
          { text: "TRY TO NEGOTIATE A PEACEFUL SOLUTION", next: "negotiate" }
        ]
      },
      diplomatic_path: {
        text: "You join the Republican government's information service, helping spread the message of independence through pamphlets, radio broadcasts, and diplomatic channels.\n\nHistorical fact: Sukarno and Hatta pursued a dual strategy — armed resistance and diplomacy. They sought international recognition, particularly from newly independent Asian nations, the United States, and the United Nations.\n\nThe situation grows tense as British and Dutch forces arrive. In Surabaya, fighting erupts between Indonesian fighters and British troops. The violence threatens to undermine the diplomatic effort.",
        choices: [
          { text: "GO TO SURABAYA TO DOCUMENT THE BATTLE FOR THE WORLD PRESS", next: "document_battle" },
          { text: "CONTINUE DIPLOMATIC WORK IN JAKARTA", next: "diplomatic_struggle" }
        ]
      },
      battle_surabaya: {
        text: "On November 10, 1945, the British attack Surabaya with tanks, aircraft, and warships. The people of Surabaya fight back with everything they have — rifles, bamboo spears, even bare hands.\n\nBung Tomo's voice crackles over the radio, rallying the fighters: \"Merdeka atau mati! Freedom or death!\"\n\nHistorical fact: The Battle of Surabaya was the bloodiest single engagement of the Indonesian revolution. An estimated 6,000-16,000 Indonesians were killed compared to about 600 British Indian casualties. November 10 is now celebrated as Heroes' Day in Indonesia.\n\nThe battle rages for three weeks. Your neighborhood is destroyed, but the fierce resistance shocks the world.",
        choices: [
          { text: "RETREAT WITH THE SURVIVING FIGHTERS TO THE COUNTRYSIDE", next: "guerrilla_war" },
          { text: "HELP EVACUATE CIVILIANS FROM THE COMBAT ZONE", next: "evacuate_civilians" }
        ]
      },
      negotiate: {
        text: "You join a group trying to mediate between the Indonesian fighters and the British. But events move too fast. Brigadier Mallaby's death has enraged the British command.\n\nHistorical fact: The killing of Brigadier Mallaby on October 30, 1945, led directly to the British ultimatum and the devastating Battle of Surabaya. It showed how quickly situations could escalate in the power vacuum after Japan's surrender.\n\nNegotiations fail. The British attack. You must choose whether to flee or fight.",
        choices: [
          { text: "JOIN THE DEFENSE OF SURABAYA", next: "battle_surabaya" },
          { text: "HELP EVACUATE CIVILIANS FROM THE COMBAT ZONE", next: "evacuate_civilians" }
        ]
      },
      document_battle: {
        text: "You reach Surabaya as the battle begins. Armed with a notebook and camera, you document the fighting — Indonesian teenagers with bamboo spears facing British tanks.\n\nYour reports are smuggled to sympathetic foreign journalists. The images of colonial troops attacking a people fighting for freedom generate worldwide sympathy.\n\nHistorical fact: International media coverage of the Indonesian revolution, particularly the Battle of Surabaya, helped turn global opinion against Dutch colonial rule. The newly formed United Nations took notice.\n\nYour documentation becomes evidence in the diplomatic struggle for independence.",
        choices: [
          { text: "CONTINUE DOCUMENTING THE REVOLUTION", next: "diplomatic_struggle" }
        ]
      },
      guerrilla_war: {
        text: "You join the guerrilla fighters in the Javanese countryside. For years, you fight a running battle against Dutch forces who launch two major military offensives — the 'Police Actions' of 1947 and 1948.\n\nHistorical fact: The Dutch launched two major military offensives (euphemistically called 'Police Actions') in 1947 and 1948. While militarily successful in capturing cities, they were diplomatic disasters that turned world opinion decisively against the Netherlands.\n\nThe Dutch capture the Republican capital, but cannot control the countryside. The guerrillas fight on.",
        choices: [
          { text: "KEEP FIGHTING UNTIL INDEPENDENCE", next: "independence" }
        ]
      },
      evacuate_civilians: {
        text: "You help families flee the burning city. Women carry children, old men carry what possessions they can save. The roads are clogged with refugees heading south into the countryside.\n\nHistorical fact: The Battle of Surabaya displaced tens of thousands of civilians. The destruction of Indonesia's second-largest city became a rallying cry for the independence movement and a symbol of the cost of colonial resistance.\n\nYou guide refugees to safety in the villages, where the independence struggle continues.",
        choices: [
          { text: "JOIN THE CONTINUING FIGHT FOR INDEPENDENCE", next: "diplomatic_struggle" }
        ]
      },
      diplomatic_struggle: {
        text: "The war drags on for four years. The Dutch have more weapons, but the Indonesians have the will of a people fighting for their homeland. Crucially, the United States threatens to cut Marshall Plan aid to the Netherlands if they don't grant independence.\n\nHistorical fact: The United States pressured the Netherlands to recognize Indonesian independence partly to prevent Indonesia from turning to communism during the early Cold War. The UN Good Offices Committee mediated negotiations.\n\nOn December 27, 1949, the Dutch formally transfer sovereignty.",
        choices: [
          { text: "CONTINUE", next: "independence" }
        ]
      },
      independence: {
        text: "Indonesia is free. After 350 years of colonial rule and four years of revolutionary war, the red and white flag flies over a sovereign nation.\n\nYou stand in the crowd as Sukarno addresses the new nation. Tears stream down faces around you — faces of farmers, students, soldiers, mothers. Freedom, bought with blood.\n\nKEY LESSONS:\n• Indonesia fought for independence for four years (1945-1949) against the returning Dutch\n• The Battle of Surabaya on November 10, 1945 became Indonesia's defining revolutionary moment\n• International pressure, especially from the United States and UN, was crucial to achieving independence\n• The revolution united Indonesia's diverse peoples — Javanese, Sundanese, Balinese, and hundreds of others — under one national identity\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  india: {
    title: "THE PARTITION OF INDIA",
    year: "1947",
    intro: "August 1947. After nearly 200 years of British rule, India is finally becoming independent. But freedom comes with a terrible price — the subcontinent is being divided into two nations: Hindu-majority India and Muslim-majority Pakistan. You are a shopkeeper in Lahore, Punjab, a city that sits directly on the new border.",
    nodes: {
      start: {
        text: "Your family has lived in Lahore for generations. Your shop sits in the old city, in a neighborhood where Hindu, Muslim, and Sikh families have lived side by side for centuries. Your best friend Rashid is Muslim. You are Hindu.\n\nRumors fly about the Radcliffe Line — the border that will divide Punjab. No one knows which side Lahore will fall on.\n\nHistorical fact: Sir Cyril Radcliffe, a British lawyer who had never visited India, was given just five weeks to draw the borders that would divide the subcontinent. His decisions would affect the lives of hundreds of millions of people.\n\nRashid comes to your shop, looking worried. \"They say Lahore will go to Pakistan. My friend, if that happens, it won't be safe for Hindus here. You should think about leaving.\"\n\nYour mother overhears. \"Leave? This is our home. Our grandfather built this shop.\"",
        choices: [
          { text: "BEGIN PREPARING YOUR FAMILY TO LEAVE LAHORE", next: "prepare_leave" },
          { text: "STAY AND TRUST THAT YOUR NEIGHBORS WILL PROTECT YOU", next: "stay_lahore" }
        ]
      },
      prepare_leave: {
        text: "You quietly begin packing valuables — the family jewels, important documents, photographs. You tell your mother you are just being cautious.\n\nOn August 14, 1947, Pakistan is born. On August 15, India becomes independent. Lahore is in Pakistan. Celebrations fill the streets, but for your family, it means you are now a religious minority in a new country.\n\nHistorical fact: The announcement of the Radcliffe Line triggered the largest mass migration in human history. An estimated 10-20 million people crossed the new borders — Hindus and Sikhs moving to India, Muslims moving to Pakistan.\n\nWithin days, violence erupts. Mobs roam the streets. Your Hindu neighbor's house is set on fire.",
        choices: [
          { text: "FLEE IMMEDIATELY WITH WHATEVER YOU CAN CARRY", next: "flee_train" },
          { text: "SEEK HELP FROM RASHID AND OTHER MUSLIM FRIENDS", next: "rashid_help" }
        ]
      },
      stay_lahore: {
        text: "You decide to stay, believing that decades of neighborly bonds will hold. For a few days after independence, they do. Rashid brings you food. Another Muslim neighbor stands guard outside your home.\n\nHistorical fact: Many families chose to stay, trusting their neighbors. In some areas, this trust was honored — Muslim, Hindu, and Sikh neighbors protected each other. In other areas, the violence overwhelmed even the strongest bonds.\n\nBut the violence spreading across Punjab reaches your neighborhood. A mob attacks a Sikh temple two streets away. Your Muslim neighbors are frightened for you.",
        choices: [
          { text: "ACCEPT THAT YOU MUST LEAVE AND PREPARE TO GO", next: "flee_train" },
          { text: "HIDE IN RASHID'S HOUSE UNTIL THE VIOLENCE PASSES", next: "rashid_help" }
        ]
      },
      flee_train: {
        text: "You join hundreds of thousands of refugees heading for the train station. The scene is overwhelming — entire families carrying their lives on their backs, children crying, old people struggling to walk.\n\nYou manage to get your family onto a train bound for Amritsar, across the new border in India. The train is so packed that people cling to the roof and hang from the doors.\n\nHistorical fact: Trains became symbols of Partition's horror. Some trains arrived at their destinations carrying only the dead — massacred by mobs who stopped the trains en route. An estimated 1-2 million people were killed during Partition.\n\nThe train creeps forward. At every stop, you fear an attack. Your mother prays continuously.",
        choices: [
          { text: "KEEP YOUR FAMILY CALM AND HIDDEN INSIDE THE TRAIN", next: "train_journey" },
          { text: "HELP ORGANIZE DEFENSE OF THE TRAIN WITH OTHER PASSENGERS", next: "defend_train" }
        ]
      },
      rashid_help: {
        text: "Rashid hides your family in his home. He tells the mobs that only Muslims live there. For three terrifying days, he risks his life to protect yours.\n\nHis wife cooks for your family. His children play with yours, oblivious to the horror outside.\n\nHistorical fact: Amid the violence of Partition, there were countless acts of courage and compassion. Muslims hid Hindu and Sikh neighbors; Hindus and Sikhs sheltered Muslims. These stories of shared humanity are often overshadowed by the violence but are equally part of Partition's legacy.\n\n\"You must go soon,\" Rashid says on the third night. \"I cannot protect you forever. I have arranged a truck to take you to the border.\"",
        choices: [
          { text: "THANK RASHID AND LEAVE FOR THE BORDER", next: "border_crossing" },
          { text: "ASK RASHID TO COME WITH YOU — IT'S NOT SAFE FOR HIM EITHER", next: "rashid_choice" }
        ]
      },
      train_journey: {
        text: "The train journey that should take hours takes two days. The train stops and starts. At one station, you hear gunshots and screaming outside. Your mother covers your little sister's ears.\n\nBut your train makes it through. When you cross into India, a refugee camp awaits — tents, food lines, and thousands of displaced people just like you.\n\nHistorical fact: Refugee camps on both sides of the border were overwhelmed. Disease, starvation, and violence continued to claim lives even after people reached 'safety.' The Indian and Pakistani governments struggled to cope with the scale of the displacement.\n\nYou have nothing but your family. Your shop, your home, your entire life in Lahore — all gone.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      defend_train: {
        text: "You and other men on the train barricade the doors and windows. When the train stops at a desolate stretch of track and a mob approaches, your group shows them you are prepared to defend yourselves.\n\nThe mob, expecting easy victims, hesitates and moves on. Your train continues.\n\nHistorical fact: Both sides committed atrocities during Partition. Hindu, Muslim, and Sikh mobs all attacked refugees of other faiths. The violence was not one-sided — it was a catastrophe that consumed communities across Punjab and Bengal.\n\nYou reach India. Safety, of a kind. But the wounds will last generations.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      border_crossing: {
        text: "Rashid's truck takes you through backroads to the border. The driver, a Muslim man Rashid trusts, risks his life to transport Hindu refugees.\n\nAt the border, Indian soldiers wave you through. You look back toward Lahore — toward the city where your grandfather built his shop, where you played as a child, where Rashid is now standing alone.\n\nHistorical fact: The border divided not just nations but families, friendships, and communities that had coexisted for centuries. Many who crossed the border in 1947 never saw their homeland again. The emotional scars of Partition persist to this day.\n\nYou arrive in India as a refugee with nothing but memories.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      rashid_choice: {
        text: "Rashid smiles sadly. \"This is my home. I will stay. But you must go.\"\n\nYou embrace your friend, knowing you may never see him again. He presses something into your hand — a small carved wooden box your grandfather once gave him as a gift. \"Take this. Remember Lahore. Remember that we were brothers.\"\n\nHistorical fact: Partition created the modern nations of India and Pakistan but left deep scars. The division of Punjab was particularly devastating — a region with a deeply intertwined culture of Hindus, Muslims, and Sikhs was torn apart in weeks.\n\nYou cross the border carrying the wooden box. You never see Rashid again.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      ending: {
        text: "You start over in India. Millions of others do the same on both sides of the border. The pain of Partition shapes the subcontinent for generations to come.\n\nDecades later, an old man, you still dream of Lahore. Of your shop. Of Rashid.\n\nKEY LESSONS:\n• The Partition of India displaced 10-20 million people — the largest mass migration in history\n• An estimated 1-2 million people were killed in the communal violence\n• A British lawyer with no knowledge of India drew the border in five weeks\n• Amid the horror, countless individuals risked their lives to protect neighbors of other faiths\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  russia: {
    title: "THE SIEGE OF STALINGRAD",
    year: "1942-1943",
    intro: "August 1942. The German Sixth Army has reached the Volga River and is fighting to capture the Soviet city of Stalingrad. Stalin has ordered: 'Not one step back.' What follows will be the bloodiest battle in human history. You are a factory worker in Stalingrad, and the Germans are at the gates.",
    nodes: {
      start: {
        text: "The Luftwaffe has been bombing Stalingrad for days. The beautiful city on the Volga is burning. Your tractor factory has been converted to produce T-34 tanks, and you have been welding tank hulls for 16 hours a day.\n\nToday the factory director announces: \"The Germans are in the suburbs. We will continue production until they are at our gates. Every tank we build is a tank that fights.\"\n\nHistorical fact: The Stalingrad Tractor Factory continued producing T-34 tanks even as German troops fought their way into the factory grounds. Some tanks rolled off the assembly line and drove straight into battle, still unpainted, crewed by factory workers.\n\nAn army commissar arrives at the factory. \"We need volunteers. Anyone who can hold a rifle.\"",
        choices: [
          { text: "VOLUNTEER TO FIGHT", next: "volunteer_fight" },
          { text: "STAY AT THE FACTORY — TANKS ARE MORE IMPORTANT", next: "stay_factory" }
        ]
      },
      volunteer_fight: {
        text: "You are handed a Mosin-Nagant rifle and five rounds of ammunition. \"When the man in front of you falls, pick up his rifle,\" the sergeant says grimly.\n\nYou are ferried across the Volga at night — the only safe time, as German planes attack anything on the river during daylight. The crossing is terrifying. Shells burst in the water around your boat.\n\nHistorical fact: Soviet reinforcements had to cross the Volga under constant fire. The river crossing was so dangerous that many soldiers drowned or were killed before reaching the city. Order No. 227 — 'Not one step back' — meant that retreat was punishable by death.\n\nYou reach the western bank. The city is an inferno of rubble and flame.",
        choices: [
          { text: "JOIN THE FIGHTING IN THE FACTORY DISTRICT", next: "factory_fighting" },
          { text: "TAKE POSITION IN THE GRAIN ELEVATOR", next: "grain_elevator" }
        ]
      },
      stay_factory: {
        text: "You stay at your welding station as the battle rages closer. The sound of gunfire mixes with the clang of hammers and the hiss of welding torches. Tanks roll out the doors and into combat streets away.\n\nHistorical fact: Soviet industrial workers were considered as vital to the war effort as soldiers. The phrase 'the rear is the front' reflected the reality that production workers were under the same bombardment and danger as combat troops.\n\nThen a shell hits the factory wall. German soldiers pour through the gap. The factory floor becomes a battlefield.",
        choices: [
          { text: "GRAB A WEAPON AND DEFEND THE FACTORY", next: "factory_fighting" },
          { text: "HELP EVACUATE WOUNDED WORKERS ACROSS THE VOLGA", next: "volga_crossing" }
        ]
      },
      factory_fighting: {
        text: "The fighting in the factory district is unlike anything imaginable. Battles rage room to room, floor to floor. You fight with rifle, bayonet, shovel — anything. Germans hold one floor of a building while Soviets hold the floor above.\n\nHistorical fact: The Germans called it 'Rattenkrieg' — the War of the Rats. The close-quarters urban combat negated German advantages in tanks and aircraft. Soviet snipers like Vasily Zaitsev became legends, picking off German officers from the rubble.\n\nYou survive day after day in this hell. Each night, supplies are ferried across the Volga. Each day, the fighting grinds on.\n\nWinter arrives. The temperature plunges far below freezing.",
        choices: [
          { text: "HOLD YOUR POSITION THROUGH THE WINTER", next: "winter_siege" },
          { text: "VOLUNTEER FOR A NIGHT RAIDING PARTY", next: "night_raid" }
        ]
      },
      grain_elevator: {
        text: "You join a small group of soldiers defending the massive grain elevator near the river. The concrete structure becomes a fortress. For days, you hold off German attacks from multiple directions.\n\nHistorical fact: The defense of Pavlov's House and the grain elevator became legendary examples of Soviet resistance. A small group of soldiers held Pavlov's House for 60 days against continuous German assault, longer than some countries resisted the entire German invasion.\n\nFood runs out. Water runs out. You collect rainwater and eat grain from the elevator stores. But you hold.",
        choices: [
          { text: "HOLD OUT UNTIL RELIEVED", next: "winter_siege" }
        ]
      },
      volga_crossing: {
        text: "You help wounded workers onto boats crossing the Volga under cover of darkness. German flares light up the night, and machine guns rake the water. Many boats don't make it.\n\nHistorical fact: The Volga crossings were controlled by the Soviet 62nd Army under General Vasily Chuikov, who established his headquarters on the river bank and refused to leave the city. His leadership was crucial to holding Stalingrad.\n\nYou make multiple crossings, each time expecting it to be your last. On one trip, you bring back fresh soldiers — reinforcements for the endless fight.",
        choices: [
          { text: "CONTINUE SUPPORTING THE DEFENSE", next: "winter_siege" }
        ]
      },
      night_raid: {
        text: "Your raiding party creeps through the ruins in the freezing darkness. Your mission: destroy a German machine gun nest that has been cutting down your company.\n\nYou navigate through sewers and bomb craters. The raid succeeds — you eliminate the position and capture supplies, including food and warm clothing your unit desperately needs.\n\nHistorical fact: Night raids were a key Soviet tactic in Stalingrad. Small groups would infiltrate German positions, cause chaos, and withdraw. The constant pressure prevented the Germans from resting and eroded their morale.\n\nYou return to your lines with German bread and sausage. Your comrades weep with gratitude.",
        choices: [
          { text: "CONTINUE FIGHTING THROUGH THE WINTER", next: "winter_siege" }
        ]
      },
      winter_siege: {
        text: "On November 19, 1942, the Soviets launch Operation Uranus — a massive counterattack that encircles the entire German Sixth Army. The besiegers have become the besieged.\n\nHistorical fact: Operation Uranus was a masterpiece of military deception and planning. Soviet forces attacked the weaker Romanian and Italian forces on the German flanks, encircling 290,000 German troops in a pocket around Stalingrad.\n\nThe trapped Germans slowly starve and freeze. Hitler refuses to allow a breakout. On February 2, 1943, Field Marshal Paulus surrenders. Of the 290,000 trapped Germans, only about 6,000 would eventually return home.\n\nYou emerge from the ruins. Stalingrad is destroyed, but the tide of the war has turned.\n\nKEY LESSONS:\n• The Battle of Stalingrad killed nearly 2 million people — soldiers and civilians on both sides\n• It was the turning point of World War II in Europe, after which Germany was on the defensive\n• Soviet civilians fought alongside soldiers, blurring the line between combatant and civilian\n• The battle demonstrated that willpower and sacrifice could overcome superior technology and tactics\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  france: {
    title: "THE FRENCH RESISTANCE",
    year: "1940-1944",
    intro: "June 1940. France has fallen to Nazi Germany in just six weeks. The northern half of the country is under direct German occupation; the south is governed by the collaborationist Vichy regime. You are a young school teacher in Lyon, in the occupied zone, and you must decide: submit, collaborate, or resist.",
    nodes: {
      start: {
        text: "German soldiers patrol the streets of Lyon. Swastika flags hang from the Hotel de Ville. Your school has been ordered to teach the new curriculum — German language is now mandatory, and certain books are banned.\n\nYour colleague, Professor Martin, whispers in the staff room: \"There is a network forming. They call it the Resistance. They need people who can be trusted — teachers, postal workers, anyone who moves through the city without suspicion.\"\n\nHistorical fact: The French Resistance began as small, unconnected groups of people who refused to accept the German occupation. Over time, these groups organized into networks for intelligence, sabotage, escape lines, and armed combat.\n\nHe slides a pamphlet across the table — an underground newspaper called 'Combat.' \"Read this. Then decide.\"",
        choices: [
          { text: "JOIN THE RESISTANCE NETWORK", next: "join_resistance" },
          { text: "HELP JEWISH STUDENTS HIDE FROM DEPORTATION", next: "hide_students" }
        ]
      },
      join_resistance: {
        text: "You are given a code name — 'Professeur' — and assigned to a cell of five people. You know only their code names, never their real identities. This way, if one is captured and tortured, they cannot betray the entire network.\n\nYour first mission: deliver a suitcase of forged identity documents to a safe house across Lyon.\n\nHistorical fact: Jean Moulin, a former government official, was sent by Charles de Gaulle to unify the various Resistance movements under one umbrella. He was eventually captured by the Gestapo in Lyon in June 1943 and tortured to death without revealing any names.\n\nThe work is terrifying. Every knock on the door could be the Gestapo. Every stranger could be an informer.",
        choices: [
          { text: "WORK ON FORGING DOCUMENTS FOR REFUGEES", next: "forge_documents" },
          { text: "TRANSITION TO SABOTAGE OPERATIONS", next: "sabotage" }
        ]
      },
      hide_students: {
        text: "Three of your students are Jewish. In 1942, the Vichy government begins rounding up Jews for deportation to German death camps — even in the 'unoccupied' zone.\n\nYou approach each family secretly. \"I can help. There are people who can hide your children.\"\n\nHistorical fact: The Vel d'Hiv Roundup of July 1942 saw French police arrest over 13,000 Jews in Paris, including 4,000 children. They were held in terrible conditions before being deported to Auschwitz. French police, not Germans, carried out the arrests.\n\nYou connect the families with a network that smuggles Jewish children to safe houses in the countryside and across the border to Switzerland.",
        choices: [
          { text: "JOIN THE RESCUE NETWORK FULL-TIME", next: "rescue_network" },
          { text: "ALSO BEGIN WORKING WITH THE ARMED RESISTANCE", next: "forge_documents" }
        ]
      },
      forge_documents: {
        text: "You become an expert forger, creating false identity cards, ration books, and travel permits. Your teacher's handwriting is perfect for the work. Each document you create can save a life.\n\nHistorical fact: Forged documents were essential to the Resistance. They allowed Jews to hide in plain sight, downed Allied airmen to escape, and Resistance fighters to move freely. Adolfo Kaminsky, a young forger in Paris, produced thousands of false documents, working so hard he nearly poisoned himself with chemical fumes.\n\nOne night, the Gestapo raids a nearby safe house. You hear the screams from your apartment. They are getting closer.",
        choices: [
          { text: "MOVE YOUR OPERATION TO A NEW LOCATION", next: "prepare_dday" },
          { text: "DESTROY THE EVIDENCE AND GO INTO HIDING", next: "into_hiding" }
        ]
      },
      sabotage: {
        text: "You join a sabotage team. Your targets: railway lines that carry German troops and supplies, communication cables, and factories producing materials for the German war effort.\n\nYou learn to make explosives from household chemicals. You learn to derail a train with a simple tool. You learn to kill.\n\nHistorical fact: Railway sabotage was one of the Resistance's most effective tactics. By 1944, the Resistance was destroying an average of 600 railway lines per month, severely disrupting German logistics.\n\nAfter a successful operation blowing up a rail bridge, the Germans execute ten civilian hostages in reprisal. The moral weight is crushing.",
        choices: [
          { text: "CONTINUE SABOTAGE DESPITE THE REPRISALS", next: "prepare_dday" },
          { text: "SHIFT TO INTELLIGENCE GATHERING — LESS RISK OF REPRISALS", next: "into_hiding" }
        ]
      },
      rescue_network: {
        text: "You join OSE — a Jewish children's rescue organization. You help smuggle children across the border to Switzerland, hidden in hay carts, carried over mountain passes, sometimes walking through the night.\n\nHistorical fact: Networks like OSE saved thousands of Jewish children during the Holocaust. In Le Chambon-sur-Lignon, an entire Protestant village sheltered approximately 3,500 Jews, including many children. The villagers never spoke of their actions for decades.\n\nYou personally escort twelve children to safety over the course of a year. Each journey is a terror of checkpoints, patrols, and informers.",
        choices: [
          { text: "CONTINUE RESCUE WORK UNTIL D-DAY", next: "prepare_dday" }
        ]
      },
      into_hiding: {
        text: "You flee Lyon and join the Maquis — rural guerrilla fighters hiding in the forests and mountains of southern France. Life is harsh — sleeping in caves, eating whatever you can find, always moving.\n\nHistorical fact: The Maquis took their name from the dense scrubland of the Mediterranean. Many were young men fleeing forced labor in German factories (the STO — Service du travail obligatoire). By 1944, the Maquis numbered in the hundreds of thousands.\n\nAs D-Day approaches, the Maquis receive weapons drops from Allied planes and prepare for the liberation.",
        choices: [
          { text: "PREPARE FOR D-DAY OPERATIONS", next: "prepare_dday" }
        ]
      },
      prepare_dday: {
        text: "On June 5, 1944, the BBC broadcasts coded messages to the Resistance: \"The dice are on the carpet.\" \"John has a long mustache.\" You know what they mean — the invasion is tomorrow.\n\nThe Resistance launches coordinated attacks across France — cutting rail lines, destroying bridges, ambushing German reinforcements heading for Normandy.\n\nHistorical fact: On D-Day and the days following, the French Resistance carried out over 1,000 acts of sabotage. They delayed German reinforcements, provided intelligence about German positions, and liberated towns ahead of the Allied advance. Eisenhower later said the Resistance was worth 15 divisions.\n\nOn August 25, 1944, Paris is liberated. French Resistance fighters are among the first to enter the city.\n\nKEY LESSONS:\n• The French Resistance involved hundreds of thousands of ordinary citizens risking everything\n• Women played crucial roles — as couriers, spies, forgers, and fighters\n• The Resistance saved thousands of Jewish lives through rescue networks\n• Their sabotage and intelligence work significantly aided the Allied liberation of France\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  sudan: {
    title: "THE BIRTH OF SOUTH SUDAN",
    year: "2005-2011",
    intro: "January 2005. After decades of devastating civil war between northern and southern Sudan, a peace agreement has been signed. The Comprehensive Peace Agreement promises the people of South Sudan a referendum on independence. You are a young teacher in Juba, the southern capital, who survived the war and now dares to hope for peace.",
    nodes: {
      start: {
        text: "The streets of Juba are cautiously celebrating. The peace agreement with Khartoum has been signed after Africa's longest civil war — over two million dead, four million displaced. You lost your father and two brothers to the fighting.\n\nYour school has been rebuilt from the rubble. Children who have known nothing but war sit in your classroom. Many are former child soldiers.\n\nHistorical fact: The Second Sudanese Civil War (1983-2005) was fought between the Arab-dominated government in Khartoum and the Sudan People's Liberation Army (SPLA) in the south. The conflict had ethnic, religious, and resource dimensions — the largely Muslim north versus the Christian and animist south, with massive oil reserves in the contested border region.\n\nA community leader approaches you. \"The peace agreement says we get a referendum in six years. We need educated people to prepare our communities. Will you help?\"",
        choices: [
          { text: "HELP ORGANIZE CIVIC EDUCATION FOR THE REFERENDUM", next: "civic_education" },
          { text: "FOCUS ON REHABILITATING CHILD SOLDIERS IN YOUR SCHOOL", next: "child_soldiers" }
        ]
      },
      civic_education: {
        text: "You travel to villages across the south, teaching people about the referendum process. Many have never voted before. Some don't understand what a country is — they know only their tribe and their village.\n\n\"What does independence mean?\" an elder asks. \"Will it bring my cattle back? Will it bring my sons back from the dead?\"\n\nHistorical fact: South Sudan is home to over 60 ethnic groups, including the Dinka, Nuer, Shilluk, and many others. The war had united them against the north, but deep divisions existed among southern groups themselves — divisions that would later prove devastating.\n\nYou explain that independence means governing themselves, controlling their resources, building their own schools and hospitals.",
        choices: [
          { text: "ADDRESS ETHNIC TENSIONS BETWEEN SOUTHERN GROUPS", next: "ethnic_tensions" },
          { text: "FOCUS ON VOTER REGISTRATION AND LOGISTICS", next: "voter_registration" }
        ]
      },
      child_soldiers: {
        text: "A boy named Deng sits in your classroom. He is twelve but looks older — his eyes carry things no child should see. He was taken by a militia at age eight.\n\nYou teach him to read. Slowly, over months, he begins to trust again. He draws pictures — first of guns and fire, then gradually of cows and rivers.\n\nHistorical fact: An estimated 20,000 children were recruited as soldiers during the Sudanese civil wars. Rehabilitation programs struggled with limited resources to help former child soldiers reintegrate into communities that had also been devastated by war.\n\nDeng asks you one day: \"Teacher, if we get our own country, will they still take children to fight?\"",
        choices: [
          { text: "EXPAND YOUR REHABILITATION WORK TO MORE COMMUNITIES", next: "ethnic_tensions" },
          { text: "JOIN THE REFERENDUM PREPARATION EFFORTS", next: "voter_registration" }
        ]
      },
      ethnic_tensions: {
        text: "You witness clashes between Dinka and Nuer communities in the south. Old grievances resurface now that the common enemy in Khartoum is fading. A cattle raid turns into a massacre. Women and children are killed.\n\nYou organize peace dialogues between the communities. \"We cannot build a new country on old hatreds,\" you plead. \"The north wants us to fight each other. That is how they kept power over us.\"\n\nHistorical fact: Inter-ethnic violence in South Sudan killed thousands even during the interim period between the peace agreement and the referendum. The SPLA, dominated by Dinka, struggled to integrate fighters from other ethnic groups, sowing seeds of future conflict.\n\nSome listen. Some don't. But you keep trying.",
        choices: [
          { text: "CONTINUE PEACE-BUILDING AS THE REFERENDUM APPROACHES", next: "referendum" }
        ]
      },
      voter_registration: {
        text: "The logistics of organizing a referendum in one of the world's least developed regions are staggering. There are almost no roads, minimal telecommunications, and most people are illiterate.\n\nYou help design ballot papers with symbols instead of words — a raised hand for independence, a handshake for unity with Sudan. You train poll workers and establish registration centers.\n\nHistorical fact: Nearly four million Southern Sudanese registered to vote in the 2011 referendum, an extraordinary achievement given the lack of infrastructure. International observers from the UN, African Union, and other organizations helped monitor the process.\n\nThe registration numbers exceed all expectations. The people want to vote.",
        choices: [
          { text: "CONTINUE TO THE REFERENDUM", next: "referendum" }
        ]
      },
      referendum: {
        text: "January 9, 2011. The referendum begins. People walk for hours, sometimes days, to reach polling stations. Old women who survived fifty years of war insist on voting. Former soldiers queue patiently. Mothers carry babies in one arm and hold ballots in the other.\n\nHistorical fact: The referendum lasted a week. Turnout was 97.58%, with 98.83% voting for independence. The result was overwhelming and unambiguous — the people of South Sudan chose to be their own nation.\n\nYou help at a polling station. When you see an elderly man cast his ballot and weep, you weep too. \"I am voting for my grandchildren,\" he says. \"For the life they deserve.\"",
        choices: [
          { text: "CELEBRATE INDEPENDENCE DAY", next: "independence_day" },
          { text: "WORRY ABOUT WHAT COMES NEXT", next: "worry_future" }
        ]
      },
      independence_day: {
        text: "July 9, 2011. The Republic of South Sudan is born — the world's newest nation. Juba explodes with joy. Dancing, singing, crying. The flag is raised for the first time.\n\nYou stand in the crowd with Deng, now a teenager, beside you. \"We have a country,\" he says in disbelief.\n\nBut even on this day of joy, you feel a knot in your stomach. The challenges ahead are immense — building a government from scratch, managing oil wealth, healing ethnic divisions.\n\nHistorical fact: South Sudan became independent with almost no infrastructure — fewer than 100 kilometers of paved roads in a country the size of France, some of the worst health and education indicators in the world, and deep ethnic divisions that the struggle for independence had temporarily papered over.\n\nKEY LESSONS:\n• Sudan's civil wars killed over two million people and displaced four million over fifty years\n• The 2011 referendum was one of the most decisive votes in history — 98.83% for independence\n• Independence did not bring peace — civil war erupted in South Sudan in 2013, killing nearly 400,000 more\n• The story of South Sudan shows that winning independence is only the first step in building a nation\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      },
      worry_future: {
        text: "You confide in a fellow teacher. \"I am afraid. We have won our freedom, but can we keep it? The Dinka and Nuer leaders are already competing for power. The oil money will corrupt. I have seen it in other countries.\"\n\nYour friend nods. \"Then we must be the ones who hold things together. Teachers, doctors, farmers — ordinary people who care about more than power.\"\n\nHistorical fact: South Sudan's post-independence optimism was shattered in December 2013 when a political dispute between President Salva Kiir (Dinka) and Vice President Riek Machar (Nuer) erupted into civil war. The conflict killed nearly 400,000 people and displaced millions.\n\nYou return to your classroom. Whatever comes next, these children need education. That, at least, you can give them.\n\nKEY LESSONS:\n• Sudan's civil wars killed over two million people and displaced four million over fifty years\n• The 2011 referendum was one of the most decisive votes in history — 98.83% for independence\n• Independence did not bring peace — civil war erupted in South Sudan in 2013, killing nearly 400,000 more\n• The story of South Sudan shows that winning independence is only the first step in building a nation\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  ukraine: {
    title: "THE HOLODOMOR",
    year: "1932-1933",
    intro: "Autumn 1932. Soviet dictator Joseph Stalin has imposed brutal grain quotas on Ukraine. Soldiers go door to door, seizing every last kernel of wheat, every potato, every scrap of food. A man-made famine is about to kill millions. You are a Ukrainian farmer in a small village near Poltava, watching your harvest being taken at gunpoint.",
    nodes: {
      start: {
        text: "Your family's wheat — the entire harvest you worked all year to grow — is being loaded onto trucks by Soviet requisition brigades. Your father protests: \"You are taking everything! What will we eat?\"\n\nThe brigade leader, a Party official from Moscow, sneers: \"You are kulaks and saboteurs. The grain belongs to the Soviet state.\"\n\nHistorical fact: Stalin's forced collectivization policy required Ukrainian farmers to surrender their land, livestock, and harvests to collective farms. Grain quotas were set impossibly high. When peasants couldn't meet them, soldiers seized everything — including seed grain needed for the next planting.\n\nYour father is arrested for 'hoarding' — he had hidden a small bag of grain under the floorboards to feed the children.",
        choices: [
          { text: "BEG THE OFFICIALS TO RELEASE YOUR FATHER", next: "beg_release" },
          { text: "HIDE THE REMAINING FOOD YOUR FAMILY HAS", next: "hide_food" }
        ]
      },
      beg_release: {
        text: "You go to the village Soviet (council) office. The chairman, once a neighbor, now avoids your eyes. \"Your father is an enemy of the people. There is nothing I can do.\"\n\nYou never see your father again.\n\nHistorical fact: During the Holodomor, an estimated 4,000 Ukrainians were arrested daily for 'crimes' related to food — hiding grain, gleaning leftover crops from fields, even picking up individual grains of wheat from the ground. The penalty could be death or years in the Gulag.\n\nWinter approaches. Your family — your mother, younger sister, and baby brother — has almost no food.",
        choices: [
          { text: "FORAGE IN THE FORESTS AND FIELDS FOR ANYTHING EDIBLE", next: "forage" },
          { text: "TRY TO FLEE THE VILLAGE FOR THE CITY", next: "flee_city" }
        ]
      },
      hide_food: {
        text: "In the dead of night, you dig a hole beneath the barn and hide dried beans, a few potatoes, and a bag of beets. If the brigades find it, your family will be arrested or worse.\n\nHistorical fact: Soviet authorities enacted the 'Law of Spikelets' in August 1932, making it a crime punishable by death to take any produce from collective farm fields — even a handful of leftover grain. Children were shot for picking up wheat ears from already-harvested fields.\n\nThe hidden food keeps your family alive through October, but it won't last the winter. Your mother grows gaunt. The baby cries constantly.",
        choices: [
          { text: "FORAGE IN THE FORESTS AND FIELDS FOR ANYTHING EDIBLE", next: "forage" },
          { text: "SEEK HELP FROM RELATIVES IN ANOTHER VILLAGE", next: "another_village" }
        ]
      },
      forage: {
        text: "You search the frozen fields and forests for anything edible — acorns, bark, roots, dried berries. You set snares for rabbits. You boil leather shoes into a weak broth.\n\nThe village is dying around you. Families that were strong in summer are skeletons by winter. You pass houses where entire families have perished inside. No one has the strength to bury them.\n\nHistorical fact: At the height of the Holodomor, an estimated 25,000 Ukrainians were dying per day. People ate bark, leaves, grass, leather, and insects. There were documented cases of cannibalism born of absolute desperation.\n\nA neighbor offers you a terrible choice — she knows of a collective farm warehouse full of grain, guarded by soldiers.",
        choices: [
          { text: "ATTEMPT TO STEAL GRAIN FROM THE WAREHOUSE", next: "steal_grain" },
          { text: "IT IS TOO DANGEROUS — KEEP FORAGING", next: "keep_surviving" }
        ]
      },
      flee_city: {
        text: "You try to walk to Kharkiv, hoping the cities have food. But at the district border, you are stopped by soldiers. A system of internal passports has been imposed — peasants are forbidden from leaving their villages.\n\nHistorical fact: In January 1933, the Soviet government issued an internal passport system specifically designed to prevent starving Ukrainian peasants from fleeing to the cities. Roadblocks turned back or arrested those trying to escape. Ukraine was effectively sealed.\n\nYou are turned back. Weakened by hunger, the walk home nearly kills you. Your mother meets you at the door, barely able to stand.",
        choices: [
          { text: "KEEP FIGHTING TO SURVIVE", next: "keep_surviving" }
        ]
      },
      another_village: {
        text: "You walk to your aunt's village, fifteen kilometers away. What you find is the same — or worse. Your aunt is dead. Her children are skeletal, living in a house with no food.\n\nHistorical fact: The famine affected all of Ukraine, as well as the Kuban region and other grain-producing areas of the Soviet Union. However, Ukraine was specifically targeted with the harshest quotas and the strictest enforcement. Historians debate whether it constitutes genocide.\n\nYou bring your aunt's surviving children back to your village. More mouths to feed, but you cannot leave children to die alone.",
        choices: [
          { text: "TRY TO KEEP EVERYONE ALIVE THROUGH THE WINTER", next: "keep_surviving" }
        ]
      },
      steal_grain: {
        text: "Under cover of a blizzard, you and two other desperate villagers approach the warehouse. It is full of Ukrainian grain — destined for export to fund Soviet industrialization while Ukrainians starve.\n\nYou manage to fill a small sack before a guard spots you. You run into the snow. The others are not so lucky — you hear shots behind you.\n\nHistorical fact: While millions of Ukrainians starved, the Soviet Union exported 1.7 million tons of grain in 1933. The grain that could have saved millions was sold abroad to fund Stalin's Five-Year Plan for industrial development.\n\nThe stolen grain keeps your family alive for another month.",
        choices: [
          { text: "SURVIVE UNTIL SPRING", next: "keep_surviving" }
        ]
      },
      keep_surviving: {
        text: "The winter of 1932-33 is the worst. Your baby brother does not survive. Your mother wraps him in a blanket and places him in the frozen ground. She does not cry — she has no tears left.\n\nSpring 1933 finally arrives. With it comes a slight easing of the quotas. New crops are planted. Slowly, impossibly, life begins to return.\n\nBut your village of 500 people has been reduced to fewer than 200. In some villages, no one survived at all.\n\nHistorical fact: The Holodomor killed an estimated 3.5 to 7.5 million Ukrainians — the exact number may never be known, as Soviet authorities destroyed records and denied the famine was happening. For decades, the Soviet Union suppressed all mention of the Holodomor.\n\nYou survived. Millions did not.\n\nKEY LESSONS:\n• The Holodomor was a man-made famine caused by Soviet policies under Stalin\n• An estimated 3.5 to 7.5 million Ukrainians died of starvation in 1932-1933\n• The Soviet government exported grain while its own people starved\n• Ukraine and many nations recognize the Holodomor as a genocide against the Ukrainian people\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  mexico: {
    title: "THE MEXICAN REVOLUTION",
    year: "1910-1920",
    intro: "November 1910. For over 30 years, dictator Porfirio Diaz has ruled Mexico. The wealthy own vast haciendas while peasants toil in near-slavery. Now revolution is brewing. Francisco Madero has called the people to arms, and across the country, farmers are picking up rifles. You are a young campesino in the state of Morelos, where the land that once belonged to your village was stolen by a sugar hacienda.",
    nodes: {
      start: {
        text: "Your village has lost its communal land — the ejido — to the expanding hacienda of Don Luis. Your family works his fields for almost nothing. You watch your father bend his back in the same soil his grandfather once owned.\n\nWord reaches the village: a man named Emiliano Zapata is gathering fighters in the mountains of Morelos. His cry is \"Tierra y Libertad\" — Land and Liberty. He promises to return the land to the people.\n\nHistorical fact: Under Porfirio Diaz's 'Porfiriato' (1876-1910), Mexico modernized rapidly but at terrible human cost. By 1910, 97% of rural families owned no land. Foreign companies and a small Mexican elite controlled the nation's wealth, while the majority lived in poverty.\n\nYour older brother has already left to join Zapata. Your mother weeps every night.",
        choices: [
          { text: "JOIN ZAPATA'S ARMY IN THE MOUNTAINS", next: "join_zapata" },
          { text: "STAY TO PROTECT YOUR FAMILY AND VILLAGE", next: "protect_village" }
        ]
      },
      join_zapata: {
        text: "You find Zapata's camp in the Sierra. The fighters are peasants like you — farmers who know the land better than any federal soldier. Zapata himself is a horseman from Anenecuilco, a man of the people.\n\nHe speaks simply: \"The land belongs to those who work it with their hands. We fight until every village has its land back.\"\n\nHistorical fact: Emiliano Zapata's Plan de Ayala (1911) demanded the return of communal lands stolen from villages under the Diaz regime. Unlike other revolutionary leaders who sought political power, Zapata's movement was fundamentally about land reform for peasants.\n\nYou are given a worn rifle and a bandolier. Your first battle is an ambush on a federal army column.",
        choices: [
          { text: "FIGHT IN THE GUERRILLA CAMPAIGN ACROSS MORELOS", next: "guerrilla_war" },
          { text: "WORK AS A MESSENGER BETWEEN ZAPATA'S CAMPS", next: "messenger" }
        ]
      },
      protect_village: {
        text: "You stay, but the revolution comes to you. Federal soldiers arrive, looking for Zapatista sympathizers. They burn houses and arrest men at random. The hacienda owner points at families he suspects of disloyalty.\n\nHistorical fact: The Mexican Revolution was devastating for civilians. Federal armies, revolutionary forces, and bandits all preyed on villages. An estimated 1.5 to 2 million Mexicans died during the revolution — most of them civilians — out of a population of about 15 million.\n\nYour father is taken. The village women and children flee to the hills. You realize there is no neutral ground in a revolution.",
        choices: [
          { text: "JOIN THE ZAPATISTAS TO FIGHT BACK", next: "guerrilla_war" },
          { text: "HELP THE VILLAGE REFUGEES SURVIVE IN THE HILLS", next: "refugee_camp" }
        ]
      },
      guerrilla_war: {
        text: "You fight through the chaos of the revolution. Diaz falls, then Madero takes power. But Madero is assassinated by General Huerta. The revolution fractures — Zapata in the south, Pancho Villa in the north, Carranza and Obregon in between.\n\nHistorical fact: The Mexican Revolution was not one revolution but many — overlapping conflicts between different factions with different goals. Zapata wanted land reform, Villa fought for the rural poor of the north, Carranza represented the liberal middle class, and Obregon was a pragmatic military leader.\n\nIn 1914, Zapata and Villa briefly occupy Mexico City. You walk the capital's streets in disbelief — peasants in the National Palace.",
        choices: [
          { text: "RETURN TO MORELOS WITH ZAPATA — THE LAND IS WHAT MATTERS", next: "land_reform" },
          { text: "STAY TO FIGHT IN THE ONGOING FACTIONAL WAR", next: "factional_war" }
        ]
      },
      messenger: {
        text: "You ride between camps carrying messages. You know every trail in Morelos. Federal soldiers are everywhere, but you move through the landscape like water.\n\nOne mission takes you to a village where Zapatistas have redistributed hacienda land to the peasants. For the first time, families are planting their own crops on their own soil.\n\nHistorical fact: In the areas they controlled, the Zapatistas actually implemented land reform — breaking up haciendas and returning communal lands to villages. This was a functioning example of their vision for Mexico, carried out while the revolution still raged.\n\nYou see what the revolution is fighting for. It is real.",
        choices: [
          { text: "CONTINUE SUPPORTING THE ZAPATISTA CAUSE", next: "land_reform" }
        ]
      },
      refugee_camp: {
        text: "You help your village survive in the hills. Women grind corn, children gather firewood, old men stand watch. You organize food sharing and tend to the sick.\n\nThe revolution rages below. You hear gunfire echoing through the valleys. Occasionally, wounded fighters stumble into your camp, and you nurse them back to health.\n\nHistorical fact: The Mexican Revolution displaced millions. Women — called 'soldaderas' — played crucial roles as fighters, nurses, cooks, and organizers. Without them, the revolutionary armies could not have functioned.\n\nA soldadera named Elena arrives at your camp. She tells you Zapata needs supplies and support from the villages.",
        choices: [
          { text: "ORGANIZE VILLAGE SUPPORT FOR ZAPATA'S ARMY", next: "land_reform" }
        ]
      },
      land_reform: {
        text: "In Morelos, the Zapatistas divide the hacienda lands. Your family receives a plot — the same land your grandfather once farmed. Your mother plants corn with tears running down her face.\n\nBut the revolution is far from over. Carranza's forces attack Morelos. Zapata fights on, but the odds grow longer.\n\nHistorical fact: On April 10, 1919, Emiliano Zapata was lured into an ambush by Carranza's forces at the Chinameca hacienda and assassinated. His death shocked Mexico, but his legacy — land reform for the peasantry — was eventually written into the Mexican Constitution of 1917.\n\nYou hear the news of Zapata's death in your field. You drop your hoe and weep.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      factional_war: {
        text: "The factional wars are brutal and confusing. Yesterday's allies become today's enemies. You fight Huertistas, then Carrancistas, then Villistas. The revolution eats its own.\n\nHistorical fact: The Mexican Revolution saw enormous brutality from all sides. Cities changed hands multiple times. Famine and disease killed as many as combat. The Spanish Flu pandemic of 1918 hit a war-weakened Mexico especially hard.\n\nBy 1917, Carranza convenes a constitutional convention. The new constitution includes radical provisions — land reform, labor rights, limits on the Church and foreign ownership. But implementing it will take decades.",
        choices: [
          { text: "CONTINUE", next: "ending" }
        ]
      },
      ending: {
        text: "The revolution eventually ends, not with a clear victory but with exhaustion. The Constitution of 1917 promises everything the peasants fought for — but the promises are slow to be fulfilled.\n\nYou return to your village. The land is yours, for now. You plant corn, beans, and squash, as your ancestors did. The revolution changed Mexico forever, but the struggle for justice continues.\n\nKEY LESSONS:\n• The Mexican Revolution (1910-1920) killed 1.5 to 2 million people in a country of 15 million\n• Emiliano Zapata's fight for 'Tierra y Libertad' made land reform central to Mexican identity\n• The Constitution of 1917 was one of the most progressive in the world at the time\n• The revolution showed that modernization without justice inevitably leads to upheaval\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  peru: {
    title: "THE SHINING PATH CONFLICT",
    year: "1980-2000",
    intro: "May 1980. Peru is returning to democracy after twelve years of military rule. But in the remote Andean highlands of Ayacucho, a Maoist guerrilla group called Sendero Luminoso — the Shining Path — has launched a brutal insurgency that will tear the country apart. You are a Quechua-speaking peasant farmer in a highland village, caught between the guerrillas and the government.",
    nodes: {
      start: {
        text: "Your village sits high in the Andes above Ayacucho. Life has always been hard here — your family grows potatoes and raises alpacas on the same terraces your Inca ancestors built. The government in Lima feels as distant as the moon.\n\nOne night, strangers arrive. They are young, educated, and speak of revolution. Their leader, a former university professor named Abimael Guzman — they call him 'Chairman Gonzalo' — has declared a 'People's War.'\n\n\"Join us,\" they say. \"We will destroy the old order and build a new Peru. A Peru for the campesinos.\"\n\nHistorical fact: Sendero Luminoso was founded by Abimael Guzman, a philosophy professor at the University of Huamanga in Ayacucho. The group followed an extreme Maoist ideology and was one of the most violent guerrilla movements in Latin American history.\n\nThey ask your village to provide food and recruits. Refusal, they imply, will have consequences.",
        choices: [
          { text: "REFUSE AND TELL THEM YOUR VILLAGE WANTS NO PART OF WAR", next: "refuse_guerrillas" },
          { text: "COOPERATE TO PROTECT THE VILLAGE FROM REPRISALS", next: "cooperate" }
        ]
      },
      refuse_guerrillas: {
        text: "Your village elder stands before the Senderistas. \"We are farmers. We want only to tend our land and raise our children. Take your war elsewhere.\"\n\nThe guerrillas leave, but their eyes are cold. Weeks later, they return in the night. The village elder is dragged from his home and executed in the plaza as a warning.\n\nHistorical fact: The Shining Path was ruthless toward anyone who opposed them, including the very peasants they claimed to represent. They killed village leaders, local officials, and anyone who resisted their authority. An estimated 31,331 people were killed by the Shining Path during the conflict.\n\nYour village is paralyzed by fear. Then the Peruvian military arrives — and they are almost as frightening.",
        choices: [
          { text: "SEEK PROTECTION FROM THE MILITARY", next: "military_protection" },
          { text: "ORGANIZE YOUR OWN VILLAGE DEFENSE", next: "ronda_campesina" }
        ]
      },
      cooperate: {
        text: "Your village provides food and shelter to the Senderistas. They hold 'people's trials' — publicly humiliating and sometimes killing those they accuse of being exploiters. The local shopkeeper is beaten. The teacher is threatened.\n\nYou watch in horror as the revolution you were promised becomes a reign of terror.\n\nHistorical fact: The Shining Path imposed a totalitarian system on villages under their control. They banned markets, traditional festivals, and religious practices. They forced communities to follow rigid Maoist doctrine, destroying centuries-old Andean cultural traditions.\n\nWhen the military comes looking for guerrillas, your village is suspected of collaboration. You are trapped between two forces, both of which will kill you.",
        choices: [
          { text: "TRY TO FLEE TO THE CITY", next: "flee_city" },
          { text: "ORGANIZE YOUR OWN VILLAGE DEFENSE", next: "ronda_campesina" }
        ]
      },
      military_protection: {
        text: "The military establishes a base near your village. But their 'protection' comes with its own horrors. Soldiers suspect every Quechua-speaking peasant of being a terrorist. Men are arrested arbitrarily. Women are assaulted.\n\nHistorical fact: The Peruvian military committed widespread human rights abuses during the conflict. The Truth and Reconciliation Commission later found that state forces were responsible for approximately 37% of the deaths — nearly as many as the Shining Path. The military treated entire indigenous communities as the enemy.\n\nYou realize that neither the guerrillas nor the government will protect your people. You must protect yourselves.",
        choices: [
          { text: "FORM A RONDA CAMPESINA — A PEASANT SELF-DEFENSE FORCE", next: "ronda_campesina" }
        ]
      },
      flee_city: {
        text: "You take your family to Ayacucho, then to Lima. You join hundreds of thousands of displaced highlanders in the vast shantytowns ringing the capital.\n\nLife in Lima is harsh. City people look down on you. You speak Quechua, wear traditional clothes, and know nothing of city life. You find work as a construction laborer.\n\nHistorical fact: The internal conflict displaced over 600,000 Peruvians, mostly indigenous Quechua and Ashaninka people from the highlands and jungle. Many settled in Lima's pueblos jovenes (shantytowns), transforming the city's demographics forever.\n\nEven in Lima, the Shining Path reaches. Car bombs explode. A blackout plunges the city into darkness.",
        choices: [
          { text: "ENDURE AND WAIT FOR THE CONFLICT TO END", next: "capture_guzman" }
        ]
      },
      ronda_campesina: {
        text: "You help organize a ronda campesina — a peasant patrol to defend your village. Armed with machetes, old shotguns, and sheer determination, your community refuses to submit to either the guerrillas or the abusive military.\n\nThe rondas patrol at night, stand watch at village entrances, and refuse to give food or recruits to the Senderistas.\n\nHistorical fact: The rondas campesinas (peasant patrols) were ultimately one of the most effective forces against the Shining Path. By the late 1980s, thousands of villages had organized self-defense committees. Their resistance denied the guerrillas the rural base they needed.\n\nThe Senderistas attack your village in retaliation. The fighting is fierce and close — neighbors against strangers. Your ronda holds them off.",
        choices: [
          { text: "CONTINUE DEFENDING YOUR COMMUNITY", next: "capture_guzman" }
        ]
      },
      capture_guzman: {
        text: "On September 12, 1992, police intelligence officers capture Abimael Guzman in a Lima apartment. The head of the Shining Path is paraded before cameras in a striped prison uniform. The movement begins to collapse.\n\nHistorical fact: Guzman's capture by the GEIN (Special Intelligence Group) was a masterpiece of detective work. A small team tracked him through months of patient surveillance, following discarded medicine packaging and other clues. His capture effectively ended the Shining Path as a major threat.\n\nThe war winds down, but its scars are deep. The Truth and Reconciliation Commission begins documenting what happened.\n\nKEY LESSONS:\n• The Peruvian internal conflict (1980-2000) killed an estimated 69,280 people\n• 75% of the victims were indigenous Quechua speakers — Peru's most marginalized people\n• Both the Shining Path and government forces committed severe human rights abuses\n• Peasant self-defense organizations were crucial to defeating the insurgency\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  venezuela: {
    title: "VENEZUELAN INDEPENDENCE",
    year: "1810-1821",
    intro: "April 1810. Across Spanish America, colonies are stirring against the Spanish Empire. In Caracas, a junta has seized power from the Spanish captain-general. A young Creole aristocrat named Simon Bolivar dreams of a free continent. You are a pardos — a mixed-race Venezuelan — working as a blacksmith in Caracas, and the revolution is about to upend your world.",
    nodes: {
      start: {
        text: "The streets of Caracas buzz with excitement and fear. The Creole elite — American-born Spaniards — have declared a junta, but they haven't included people like you. The pardos, zambos, and enslaved Africans make up the majority but have no voice.\n\nSimon Bolivar speaks from a balcony, his words ringing with passion: \"We will be free! The tyranny of Spain is finished!\"\n\nHistorical fact: Venezuelan society was rigidly stratified by race. Peninsulares (Spanish-born) held the highest positions, followed by Creoles (American-born whites), then pardos (mixed race), indigenous people, and enslaved Africans. Independence was initially a Creole movement that did not address racial inequality.\n\nA fellow pardo, a veteran soldier named Pedro, grabs your arm. \"They speak of freedom, but freedom for whom? Will we trade a Spanish master for a Creole one?\"",
        choices: [
          { text: "JOIN THE INDEPENDENCE MOVEMENT DESPITE YOUR DOUBTS", next: "join_independence" },
          { text: "DEMAND RIGHTS FOR PARDOS AS THE PRICE OF YOUR SUPPORT", next: "demand_rights" }
        ]
      },
      join_independence: {
        text: "You enlist in the Patriot army. Your skills as a blacksmith are valuable — you repair weapons, shoe horses, and forge bayonets. On July 5, 1811, Venezuela formally declares independence.\n\nBut the young republic is fragile. The Royalists fight back, and a devastating earthquake strikes Caracas in March 1812.\n\nHistorical fact: The 1812 earthquake killed an estimated 10,000-20,000 people in Patriot-held cities while leaving Royalist areas largely unscathed. Spanish priests proclaimed it God's punishment for rebellion. Bolivar famously declared: 'If Nature opposes us, we shall fight Nature and make it obey.'\n\nThe First Republic collapses. Bolivar flees to exile. The Royalist commander Boves leads a brutal campaign, using pardos and llaneros (plainsmen) against the Creole patriots.",
        choices: [
          { text: "FLEE WITH BOLIVAR AND THE PATRIOTS", next: "exile_return" },
          { text: "SURVIVE UNDER ROYALIST RULE AND WAIT", next: "royalist_rule" }
        ]
      },
      demand_rights: {
        text: "You and other pardos present demands to the Patriot junta: equal citizenship, the right to hold office, an end to racial laws. The Creole leaders are uncomfortable but need your numbers.\n\nHistorical fact: The racial dynamics of Venezuelan independence were complex. Many pardos and enslaved people initially fought for the Spanish Crown because the Royalists promised them freedom and equality — promises the Creole elite had not made. The brutal Royalist commander Jose Tomas Boves recruited a devastating army of pardos and llaneros.\n\nThe junta makes vague promises. When the Republic falls in 1812, you are left wondering if either side truly cares about people like you.",
        choices: [
          { text: "JOIN THE ROYALIST FORCES — AT LEAST THEY OFFER IMMEDIATE FREEDOM", next: "royalist_rule" },
          { text: "WAIT AND SEE WHICH SIDE WILL TRULY OFFER EQUALITY", next: "exile_return" }
        ]
      },
      exile_return: {
        text: "Bolivar goes into exile twice but returns each time, learning from his failures. He realizes he cannot win without the pardos and llaneros. He promises abolition of slavery and racial equality.\n\nIn 1819, Bolivar leads an astonishing march — 2,500 soldiers across the flooded llanos and over the frozen Andes — to liberate New Granada (Colombia).\n\nHistorical fact: Bolivar's crossing of the Andes in 1819 is considered one of the greatest military feats in history. His army crossed at altitudes above 4,000 meters, losing a quarter of their men to cold, altitude sickness, and exhaustion. But the surprise attack liberated Bogota.\n\nYou march with him. The cold in the mountains is beyond anything you imagined. Men die standing up, frozen in place.",
        choices: [
          { text: "PUSH FORWARD WITH BOLIVAR ACROSS THE ANDES", next: "battle_carabobo" },
          { text: "HELP THE SICK AND DYING SOLDIERS SURVIVE THE CROSSING", next: "help_crossing" }
        ]
      },
      royalist_rule: {
        text: "Under Royalist rule, the war becomes even more brutal. Commander Boves unleashes a campaign of terror — the 'War to the Death' consumes Venezuela. Atrocities are committed by both sides.\n\nHistorical fact: The Venezuelan War of Independence was extraordinarily destructive. An estimated one-quarter to one-third of Venezuela's population died during the wars — from combat, disease, famine, and massacres. Both sides declared 'War to the Death' against the other.\n\nAs the years drag on, the tide slowly turns. Bolivar returns with new armies and new promises. This time, he offers freedom to enslaved people who fight for independence.",
        choices: [
          { text: "JOIN BOLIVAR'S RENEWED CAMPAIGN", next: "battle_carabobo" }
        ]
      },
      help_crossing: {
        text: "You carry a sick soldier on your back through an Andean pass. Ice crunches under your feet. The wind cuts like a knife. Three men in your unit die of exposure in a single night.\n\nBut you make it through. On the other side of the mountains, the Spanish garrison is shocked — they never expected an army from this direction.\n\nHistorical fact: The element of surprise was Bolivar's greatest weapon. The Spanish believed the Andes were impassable with an army. The victory at the Battle of Boyaca on August 7, 1819, liberated New Granada and turned the tide of the war.\n\nThe liberation of Colombia gives Bolivar the resources to return to Venezuela.",
        choices: [
          { text: "MARCH BACK TO LIBERATE VENEZUELA", next: "battle_carabobo" }
        ]
      },
      battle_carabobo: {
        text: "On June 24, 1821, the decisive Battle of Carabobo takes place. Bolivar's army — Creoles, pardos, llaneros, freed slaves, and even a British Legion — faces the Spanish Royalists on a field outside Valencia.\n\nThe battle is fierce but decisive. The llanero cavalry, led by the legendary Jose Antonio Paez, breaks the Spanish lines. By afternoon, it is over.\n\nHistorical fact: The Battle of Carabobo effectively ended Spanish rule in Venezuela, though scattered fighting continued. Bolivar went on to liberate Ecuador, Peru, and Bolivia, earning the title 'El Libertador.' His dream was a united South America, but it fractured into separate nations within his lifetime.\n\nVenezuela is free. You stand on the battlefield, a free citizen of a free nation.\n\nKEY LESSONS:\n• Venezuelan independence required over a decade of devastating warfare (1810-1821)\n• The war killed an estimated quarter to a third of Venezuela's population\n• Bolivar's success depended on building multi-racial alliances and promising equality\n• The struggle for independence across South America was interconnected — Bolivar liberated six nations\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  },

  mongolia: {
    title: "THE BATTLE OF KHALKHIN GOL",
    year: "1939",
    intro: "May 1939. On the remote steppes where Mongolia meets Manchuria, a border dispute between Soviet-allied Mongolia and Japanese-occupied Manchukuo is about to erupt into a full-scale battle. While the world watches Hitler's moves in Europe, a forgotten war on the Asian steppe will shape the course of World War II. You are a young Mongolian herder whose family has grazed their horses near the Khalkhin Gol river for generations.",
    nodes: {
      start: {
        text: "Your family's pastures lie along the Khalkhin Gol — a shallow river that the Japanese say is the border, and the Mongolians say is not. For years, Japanese patrols from Manchukuo have been pushing westward.\n\nToday, Mongolian cavalry soldiers ride into your camp. Their commander speaks urgently: \"The Japanese have crossed the river in force. We need every able rider. Mongolia calls upon you.\"\n\nHistorical fact: Japan's Kwantung Army in Manchuria had been probing the Mongolian border for years, testing Soviet and Mongolian resolve. The Japanese believed the Soviet army was weak and that a sharp blow would establish Japanese dominance in the region.\n\nYour father, a veteran of earlier border clashes, looks at you. \"This is our land. Our ancestors' land. Go.\"",
        choices: [
          { text: "JOIN THE MONGOLIAN CAVALRY", next: "join_cavalry" },
          { text: "HELP EVACUATE YOUR FAMILY AND HERDS FROM THE BATTLE ZONE", next: "evacuate_herds" }
        ]
      },
      join_cavalry: {
        text: "You ride with the Mongolian cavalry to the front lines along the Khalkhin Gol. The Japanese Kwantung Army has crossed in strength — infantry, tanks, and aircraft.\n\nYour unit scouts the Japanese positions, riding fast across the open steppe. You know this terrain — every hill, every dry riverbed. The Japanese do not.\n\nHistorical fact: Mongolian cavalry played an important role in the early stages of the battle, conducting reconnaissance and skirmishing with Japanese forces. Mongolia, though a small nation, was fiercely committed to defending its territory alongside its Soviet allies.\n\nThen the Soviets arrive in force. Their commander is an unknown general named Georgy Zhukov — a man who will soon become one of the most important military commanders in history.",
        choices: [
          { text: "SCOUT FOR ZHUKOV'S ADVANCING FORCES", next: "scout_zhukov" },
          { text: "FIGHT IN THE CAVALRY ACTIONS ALONG THE RIVER", next: "river_fighting" }
        ]
      },
      evacuate_herds: {
        text: "You help your family and neighboring herders move thousands of horses, cattle, and sheep away from the combat zone. The animals are everything — your wealth, your food, your way of life.\n\nJapanese aircraft strafe the steppe, hitting military and civilian targets alike. You lose several horses to the bombing.\n\nHistorical fact: The nomadic herders of the Mongolian-Manchurian border region had lived and grazed across these lands for centuries, long before modern borders existed. The battle disrupted their ancient way of life.\n\nOnce your family is safe, you ride back toward the battle. Soviet trucks and tanks are rolling across the steppe — more military equipment than you have ever seen.",
        choices: [
          { text: "OFFER YOUR SERVICES AS A GUIDE — YOU KNOW THIS LAND", next: "scout_zhukov" },
          { text: "JOIN THE MONGOLIAN UNITS AT THE FRONT", next: "river_fighting" }
        ]
      },
      scout_zhukov: {
        text: "General Zhukov accepts local guides eagerly. You lead Soviet armored columns through terrain that would have bogged down troops unfamiliar with the steppe — dry riverbeds that become quagmires after rain, firm ground that looks like marsh, hidden approaches through low hills.\n\nHistorical fact: Georgy Zhukov was a relatively unknown commander when he was assigned to Khalkhin Gol. His performance there — aggressive, innovative, and decisive — launched his career. He would go on to be the most important Soviet general of World War II, leading the defense of Moscow, the victory at Stalingrad, and the final assault on Berlin.\n\nZhukov is planning something big. You can see vast quantities of supplies being stockpiled — far more than needed for defense.",
        choices: [
          { text: "PARTICIPATE IN ZHUKOV'S SECRET COUNTEROFFENSIVE", next: "counteroffensive" }
        ]
      },
      river_fighting: {
        text: "The fighting along the Khalkhin Gol is intense. Japanese soldiers are tough and fanatical, attacking in waves. Mongolian and Soviet troops hold the west bank of the river against repeated assaults.\n\nYou fight mounted and dismounted, using your horsemanship to strike Japanese flanks and withdraw before they can respond. The steppe warfare suits the Mongolian cavalry.\n\nHistorical fact: The Japanese Kwantung Army was considered one of Japan's best formations. They fought with tremendous determination at Khalkhin Gol, but were outmatched by Soviet firepower — particularly tanks, artillery, and aircraft — which Zhukov deployed in overwhelming concentrations.\n\nAfter weeks of bloody fighting, the front stabilizes. Then Zhukov springs his trap.",
        choices: [
          { text: "JOIN THE COUNTEROFFENSIVE", next: "counteroffensive" }
        ]
      },
      counteroffensive: {
        text: "On August 20, 1939, Zhukov launches a massive double envelopment — armored forces sweep around both Japanese flanks while infantry pins them in the center. It is a textbook encirclement.\n\nYou ride with the Mongolian cavalry on the southern flank, helping to close the ring around the trapped Japanese forces. The speed of the attack stuns the enemy.\n\nHistorical fact: Zhukov's counteroffensive at Khalkhin Gol was one of the first modern combined-arms operations — coordinating tanks, infantry, artillery, and aircraft in a coordinated assault. The tactics he developed here would later be used to devastating effect against the Germans.\n\nThe Japanese 23rd Division is surrounded and destroyed. By September 16, it is over.",
        choices: [
          { text: "WITNESS THE AFTERMATH OF THE BATTLE", next: "aftermath" }
        ]
      },
      aftermath: {
        text: "The steppe is quiet again, but scarred. Burned-out tanks and equipment litter the battlefield. The Japanese have lost over 18,000 men killed or wounded.\n\nA ceasefire is signed on September 16, 1939 — the same month Germany invades Poland and World War II begins in Europe.\n\nHistorical fact: The Japanese defeat at Khalkhin Gol had enormous strategic consequences. It convinced Japan's leaders to abandon plans to attack the Soviet Union and instead strike south toward Southeast Asia and the Pacific — leading directly to Pearl Harbor. This meant the Soviets could transfer Siberian divisions west to defend Moscow in 1941, potentially saving the Soviet Union from defeat.\n\nYou return to your family's pastures by the Khalkhin Gol. The river still flows. The horses still graze. But the world has changed.\n\nKEY LESSONS:\n• The Battle of Khalkhin Gol (1939) was a decisive Soviet-Mongolian victory over Japan\n• The battle launched Georgy Zhukov's career — he became the most important Allied general of WWII\n• Japan's defeat convinced them to strike south (Pearl Harbor) rather than north (Siberia)\n• This 'forgotten battle' on the Mongolian steppe shaped the entire course of World War II\n\nThank you for experiencing this chapter of history.",
        choices: [],
        isEnding: true
      }
    }
  }
};

export default stories;
