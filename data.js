const RECIPES = [
  {
    "ja": "肉じゃが",
    "en": "Meat and Potato Stew",
    "ingredients": [
      "豚肉",
      "じゃがいも",
      "にんじん",
      "玉ねぎ"
    ],
    "category": "肉",
    "level": "Beginner",
    "rating": 9.5
  },
  {
    "ja": "豚の生姜焼き",
    "en": "Ginger Pork",
    "ingredients": [
      "豚肉",
      "玉ねぎ"
    ],
    "category": "肉",
    "level": "Beginner",
    "rating": 9.3
  },
  {
    "ja": "鶏の唐揚げ",
    "en": "Japanese Fried Chicken",
    "ingredients": [
      "鶏肉"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 9.8
  },
  {
    "ja": "ハンバーグ",
    "en": "Hamburger Steak",
    "ingredients": [
      "ひき肉",
      "玉ねぎ"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 9.6
  },
  {
    "ja": "とんかつ",
    "en": "Pork Cutlet",
    "ingredients": [
      "豚肉"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 9.4
  },
  {
    "ja": "チキン南蛮",
    "en": "Chicken Nanban",
    "ingredients": [
      "鶏肉"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 9.2
  },
  {
    "ja": "筑前煮",
    "en": "Chikuzenni (Simmered Chicken and Vegetables)",
    "ingredients": [
      "鶏肉",
      "ごぼう",
      "にんじん",
      "れんこん",
      "こんにゃく",
      "しいたけ"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 8.8
  },
  {
    "ja": "回鍋肉",
    "en": "Twice-Cooked Pork with Cabbage",
    "ingredients": [
      "豚肉",
      "キャベツ",
      "ピーマン"
    ],
    "category": "肉",
    "level": "Beginner",
    "rating": 9.0
  },
  {
    "ja": "麻婆豆腐",
    "en": "Mapo Tofu",
    "ingredients": [
      "ひき肉",
      "豆腐"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 9.1
  },
  {
    "ja": "青椒肉絲",
    "en": "Stir-fried Pork and Green Pepper",
    "ingredients": [
      "豚肉",
      "ピーマン",
      "たけのこ"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 8.9
  },
  {
    "ja": "餃子",
    "en": "Gyoza (Pan-fried Dumplings)",
    "ingredients": [
      "ひき肉",
      "キャベツ",
      "ニラ",
      "ニンニク"
    ],
    "category": "肉",
    "level": "Advanced",
    "rating": 9.7
  },
  {
    "ja": "シュウマイ",
    "en": "Shumai (Steamed Dumplings)",
    "ingredients": [
      "ひき肉",
      "玉ねぎ"
    ],
    "category": "肉",
    "level": "Advanced",
    "rating": 8.7
  },
  {
    "ja": "豚の角煮",
    "en": "Braised Pork Belly",
    "ingredients": [
      "豚肉"
    ],
    "category": "肉",
    "level": "Advanced",
    "rating": 9.4
  },
  {
    "ja": "照り焼きチキン",
    "en": "Teriyaki Chicken",
    "ingredients": [
      "鶏肉"
    ],
    "category": "肉",
    "level": "Beginner",
    "rating": 9.0
  },
  {
    "ja": "ロールキャベツ",
    "en": "Rolled Cabbage Stew",
    "ingredients": [
      "ひき肉",
      "キャベツ",
      "玉ねぎ"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 8.5
  },
  {
    "ja": "メンチカツ",
    "en": "Ground Meat Cutlet",
    "ingredients": [
      "ひき肉",
      "玉ねぎ"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 9.0
  },
  {
    "ja": "肉豆腐",
    "en": "Meat and Tofu Hot Pot",
    "ingredients": [
      "牛肉",
      "豆腐",
      "玉ねぎ"
    ],
    "category": "肉",
    "level": "Beginner",
    "rating": 8.9
  },
  {
    "ja": "すき焼き",
    "en": "Sukiyaki (Hot Pot)",
    "ingredients": [
      "牛肉",
      "豆腐",
      "玉ねぎ",
      "長ねぎ",
      "しいたけ",
      "えのき",
      "春菊"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 9.6
  },
  {
    "ja": "しゃぶしゃぶ",
    "en": "Shabu-shabu (Hot Pot)",
    "ingredients": [
      "豚肉",
      "白菜",
      "長ねぎ",
      "しいたけ",
      "えのき"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 9.5
  },
  {
    "ja": "鶏肉と野菜の炒め物",
    "en": "Stir-fried Chicken and Vegetables",
    "ingredients": [
      "鶏肉",
      "玉ねぎ",
      "にんじん",
      "ピーマン"
    ],
    "category": "肉",
    "level": "Beginner",
    "rating": 8.7
  },
  {
    "ja": "豚キムチ",
    "en": "Pork and Kimchi Stir-fry",
    "ingredients": [
      "豚肉",
      "キムチ"
    ],
    "category": "肉",
    "level": "Beginner",
    "rating": 9.1
  },
  {
    "ja": "手羽先の甘辛煮",
    "en": "Sweet and Savory Chicken Wings",
    "ingredients": [
      "鶏肉"
    ],
    "category": "肉",
    "level": "Beginner",
    "rating": 8.8
  },
  {
    "ja": "鶏肉のトマト煮",
    "en": "Chicken and Tomato Stew",
    "ingredients": [
      "鶏肉",
      "玉ねぎ",
      "じゃがいも",
      "にんじん",
      "トマト"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 8.6
  },
  {
    "ja": "豚バラ大根",
    "en": "Simmered Pork Belly and Daikon Radish",
    "ingredients": [
      "豚肉",
      "大根"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 9.0
  },
  {
    "ja": "鶏大根",
    "en": "Simmered Chicken and Daikon Radish",
    "ingredients": [
      "鶏肉",
      "大根"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 8.9
  },
  {
    "ja": "サバの塩焼き",
    "en": "Salt-grilled Mackerel",
    "ingredients": [
      "サバ"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 9.0
  },
  {
    "ja": "アジの開き",
    "en": "Grilled Horse Mackerel",
    "ingredients": [
      "アジ"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 8.8
  },
  {
    "ja": "鮭の塩焼き",
    "en": "Salt-grilled Salmon",
    "ingredients": [
      "鮭"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 9.2
  },
  {
    "ja": "サバの味噌煮",
    "en": "Mackerel Simmered in Miso",
    "ingredients": [
      "サバ",
      "ネギ",
      "ショウガ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 9.3
  },
  {
    "ja": "カレイの煮付け",
    "en": "Simmered Flounder",
    "ingredients": [
      "カレイ",
      "ゴボウ",
      "ショウガ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 9.0
  },
  {
    "ja": "イカと大根の煮物",
    "en": "Simmered Squid and Daikon Radish",
    "ingredients": [
      "イカ",
      "ダイコン"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 8.9
  },
  {
    "ja": "あさりの酒蒸し",
    "en": "Steamed Clams in Sake",
    "ingredients": [
      "アサリ",
      "ネギ"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 8.7
  },
  {
    "ja": "エビチリ",
    "en": "Shrimp with Chili Sauce",
    "ingredients": [
      "エビ",
      "ネギ",
      "ショウガ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 9.1
  },
  {
    "ja": "アジフライ",
    "en": "Deep-fried Horse Mackerel",
    "ingredients": [
      "アジ",
      "キャベツ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 8.5
  },
  {
    "ja": "エビフライ",
    "en": "Deep-fried Shrimp",
    "ingredients": [
      "エビ",
      "キャベツ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 9.0
  },
  {
    "ja": "カキフライ",
    "en": "Deep-fried Oysters",
    "ingredients": [
      "カキ",
      "キャベツ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 8.8
  },
  {
    "ja": "イカの生姜焼き",
    "en": "Squid Stir-fry with Ginger",
    "ingredients": [
      "イカ",
      "ピーマン",
      "玉ねぎ",
      "ショウガ"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 8.6
  },
  {
    "ja": "ホタテのバター焼き",
    "en": "Pan-fried Scallops with Butter",
    "ingredients": [
      "ホタテ",
      "きのこ",
      "レモン"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 8.7
  },
  {
    "ja": "タコの唐揚げ",
    "en": "Deep-fried Octopus",
    "ingredients": [
      "タコ"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 8.5
  },
  {
    "ja": "タコとキュウリの酢の物",
    "en": "Octopus and Cucumber Salad with Vinegar",
    "ingredients": [
      "タコ",
      "キュウリ"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 8.2
  },
  {
    "ja": "カツオのたたき",
    "en": "Seared Bonito",
    "ingredients": [
      "カツオ",
      "ネギ",
      "ショウガ",
      "ニンニク"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 9.4
  },
  {
    "ja": "イワシの蒲焼き",
    "en": "Grilled Sardines with Sweet Soy Sauce",
    "ingredients": [
      "イワシ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 8.9
  },
  {
    "ja": "サンマの塩焼き",
    "en": "Salt-grilled Pacific Saury",
    "ingredients": [
      "サンマ"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 9.1
  },
  {
    "ja": "ブリの照り焼き",
    "en": "Teriyaki Yellowtail",
    "ingredients": [
      "ブリ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 9.2
  },
  {
    "ja": "タラの煮付け",
    "en": "Simmered Cod",
    "ingredients": [
      "タラ",
      "豆腐"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 8.8
  },
  {
    "ja": "マグロの漬け",
    "en": "Marinated Tuna",
    "ingredients": [
      "マグロ",
      "ワサビ"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 9.0
  },
  {
    "ja": "魚のアラ汁",
    "en": "Fish Bone Soup",
    "ingredients": [
      "魚のアラ",
      "ダイコン",
      "ネギ",
      "豆腐"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 8.5
  },
  {
    "ja": "イカの一夜干し",
    "en": "Grilled Dried Squid",
    "ingredients": [
      "イカ"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 8.3
  },
  {
    "ja": "シラスおろし",
    "en": "Whitebait with Grated Daikon Radish",
    "ingredients": [
      "シラス",
      "ダイコン"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 8.0
  },
  {
    "ja": "エビと卵の炒め物",
    "en": "Stir-fried Shrimp and Egg",
    "ingredients": [
      "エビ",
      "卵",
      "ネギ"
    ],
    "category": "魚介",
    "level": "Beginner",
    "rating": 8.6
  },
  {
    "ja": "味噌汁",
    "en": "Miso Soup",
    "ingredients": [
      "豆腐",
      "わかめ",
      "ねぎ"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 9.8
  },
  {
    "ja": "けんちん汁",
    "en": "Kenchinjiru (Vegetable and Tofu Soup)",
    "ingredients": [
      "大根",
      "にんじん",
      "ごぼう",
      "里芋",
      "こんにゃく",
      "豆腐"
    ],
    "category": "野菜・副菜",
    "level": "Intermediate",
    "rating": 9.2
  },
  {
    "ja": "お吸い物",
    "en": "Clear Soup (Osuimono)",
    "ingredients": [
      "豆腐",
      "わかめ",
      "三つ葉"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.5
  },
  {
    "ja": "ひじきの煮物",
    "en": "Simmered Hijiki Seaweed",
    "ingredients": [
      "ひじき",
      "にんじん",
      "油揚げ",
      "大豆"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 9.0
  },
  {
    "ja": "切り干し大根の煮物",
    "en": "Simmered Dried Daikon Radish",
    "ingredients": [
      "切り干し大根",
      "にんじん",
      "油揚げ"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.8
  },
  {
    "ja": "きんぴらごぼう",
    "en": "Kinpira Gobo (Stir-fried Burdock and Carrot)",
    "ingredients": [
      "ごぼう",
      "にんじん"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 9.3
  },
  {
    "ja": "ほうれん草のおひたし",
    "en": "Spinach Ohitashi (Blanched Spinach)",
    "ingredients": [
      "ほうれん草"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 9.1
  },
  {
    "ja": "小松菜のおひたし",
    "en": "Komatsuna Ohitashi (Blanched Komatsuna)",
    "ingredients": [
      "小松菜"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.9
  },
  {
    "ja": "ほうれん草の胡麻和え",
    "en": "Spinach Gomae (Spinach with Sesame Dressing)",
    "ingredients": [
      "ほうれん草",
      "ごま"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 9.2
  },
  {
    "ja": "きゅうりとわかめの酢の物",
    "en": "Cucumber and Wakame Sunomono (Vinegared Salad)",
    "ingredients": [
      "きゅうり",
      "わかめ"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.7
  },
  {
    "ja": "冷奴",
    "en": "Hiyayakko (Chilled Tofu)",
    "ingredients": [
      "豆腐",
      "ねぎ",
      "生姜"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 9.4
  },
  {
    "ja": "湯豆腐",
    "en": "Yudofu (Hot Tofu Pot)",
    "ingredients": [
      "豆腐",
      "昆布",
      "ねぎ"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.6
  },
  {
    "ja": "かぼちゃの煮物",
    "en": "Simmered Pumpkin",
    "ingredients": [
      "かぼちゃ"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 9.0
  },
  {
    "ja": "なすの煮浸し",
    "en": "Simmered Eggplant",
    "ingredients": [
      "なす"
    ],
    "category": "野菜・副菜",
    "level": "Intermediate",
    "rating": 8.8
  },
  {
    "ja": "ふろふき大根",
    "en": "Furofuki Daikon (Simmered Daikon with Miso)",
    "ingredients": [
      "大根"
    ],
    "category": "野菜・副菜",
    "level": "Intermediate",
    "rating": 8.9
  },
  {
    "ja": "大学芋",
    "en": "Daigaku Imo (Candied Sweet Potato)",
    "ingredients": [
      "さつまいも"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 9.0
  },
  {
    "ja": "野菜炒め",
    "en": "Yasai Itame (Stir-fried Vegetables)",
    "ingredients": [
      "キャベツ",
      "もやし",
      "にんじん",
      "ピーマン",
      "玉ねぎ"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 9.3
  },
  {
    "ja": "もやし炒め",
    "en": "Moyashi Itame (Stir-fried Bean Sprouts)",
    "ingredients": [
      "もやし",
      "ニラ"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.5
  },
  {
    "ja": "きのこのソテー",
    "en": "Kinoko no Sauté (Sautéed Mushrooms)",
    "ingredients": [
      "きのこ"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.7
  },
  {
    "ja": "大根サラダ",
    "en": "Daikon Salad (Radish Salad)",
    "ingredients": [
      "大根",
      "大葉"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.6
  },
  {
    "ja": "蓮根のきんぴら",
    "en": "Renkon Kinpira (Stir-fried Lotus Root)",
    "ingredients": [
      "蓮根",
      "にんじん"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 9.1
  },
  {
    "ja": "かぶの浅漬け",
    "en": "Kabu no Asazuke (Quick-pickled Turnip)",
    "ingredients": [
      "かぶ"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.4
  },
  {
    "ja": "きゅうりの浅漬け",
    "en": "Kyuri no Asazuke (Quick-pickled Cucumber)",
    "ingredients": [
      "きゅうり"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.5
  },
  {
    "ja": "白菜の漬物",
    "en": "Hakusai no Tsukemono (Pickled Napa Cabbage)",
    "ingredients": [
      "白菜"
    ],
    "category": "野菜・副菜",
    "level": "Beginner",
    "rating": 8.3
  },
  {
    "ja": "厚揚げの煮物",
    "en": "Atsuage no Nimono (Simmered Deep-fried Tofu)",
    "ingredients": [
      "厚揚げ",
      "大根",
      "にんじん"
    ],
    "category": "野菜・副菜",
    "level": "Intermediate",
    "rating": 8.7
  },
  {
    "ja": "カレーライス",
    "en": "Curry Rice",
    "ingredients": [
      "豚肉",
      "じゃがいも",
      "にんじん",
      "玉ねぎ"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 9.0
  },
  {
    "ja": "牛丼",
    "en": "Beef Bowl",
    "ingredients": [
      "牛肉",
      "玉ねぎ"
    ],
    "category": "肉",
    "level": "Beginner",
    "rating": 9.2
  },
  {
    "ja": "親子丼",
    "en": "Chicken and Egg Bowl",
    "ingredients": [
      "鶏肉",
      "卵",
      "玉ねぎ"
    ],
    "category": "肉",
    "level": "Beginner",
    "rating": 9.3
  },
  {
    "ja": "カツ丼",
    "en": "Pork Cutlet Bowl",
    "ingredients": [
      "豚肉",
      "卵",
      "玉ねぎ"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 9.4
  },
  {
    "ja": "天丼",
    "en": "Tempura Bowl",
    "ingredients": [
      "えび",
      "いか",
      "なす",
      "ピーマン",
      "かぼちゃ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 9.1
  },
  {
    "ja": "うな丼",
    "en": "Eel Bowl",
    "ingredients": [
      "うなぎ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 9.0
  },
  {
    "ja": "チャーハン",
    "en": "Fried Rice",
    "ingredients": [
      "ごはん",
      "卵",
      "豚肉",
      "ねぎ"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 8.8
  },
  {
    "ja": "オムライス",
    "en": "Omelet Rice",
    "ingredients": [
      "卵",
      "ごはん",
      "鶏肉",
      "玉ねぎ"
    ],
    "category": "主食",
    "level": "Intermediate",
    "rating": 9.2
  },
  {
    "ja": "炊き込みご飯",
    "en": "Mixed Rice",
    "ingredients": [
      "ごはん",
      "鶏肉",
      "ごぼう",
      "にんじん",
      "きのこ"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 8.9
  },
  {
    "ja": "雑炊",
    "en": "Rice Porridge",
    "ingredients": [
      "ごはん",
      "卵",
      "ねぎ"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 8.5
  },
  {
    "ja": "お茶漬け",
    "en": "Tea Over Rice",
    "ingredients": [
      "ごはん",
      "鮭",
      "梅干し",
      "のり"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 8.0
  },
  {
    "ja": "いなり寿司",
    "en": "Fried Tofu Pouch Sushi",
    "ingredients": [
      "ごはん",
      "油揚げ"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 8.5
  },
  {
    "ja": "巻き寿司",
    "en": "Rolled Sushi",
    "ingredients": [
      "ごはん",
      "のり",
      "きゅうり",
      "卵",
      "ツナ"
    ],
    "category": "主食",
    "level": "Intermediate",
    "rating": 8.7
  },
  {
    "ja": "ちらし寿司",
    "en": "Scattered Sushi",
    "ingredients": [
      "ごはん",
      "えび",
      "いか",
      "まぐろ",
      "卵",
      "きゅうり",
      "きのこ"
    ],
    "category": "魚介",
    "level": "Intermediate",
    "rating": 9.0
  },
  {
    "ja": "麻婆丼",
    "en": "Mapo Tofu Bowl",
    "ingredients": [
      "ごはん",
      "豚肉",
      "豆腐",
      "ねぎ"
    ],
    "category": "肉",
    "level": "Intermediate",
    "rating": 8.9
  },
  {
    "ja": "中華丼",
    "en": "Chinese-Style Donburi",
    "ingredients": [
      "ごはん",
      "豚肉",
      "えび",
      "いか",
      "白菜",
      "にんじん",
      "きのこ",
      "うずらの卵"
    ],
    "category": "主食",
    "level": "Intermediate",
    "rating": 8.8
  },
  {
    "ja": "ドリア",
    "en": "Doria (Baked Rice Gratin)",
    "ingredients": [
      "ごはん",
      "鶏肉",
      "玉ねぎ",
      "チーズ"
    ],
    "category": "主食",
    "level": "Intermediate",
    "rating": 8.9
  },
  {
    "ja": "ピラフ",
    "en": "Pilaf",
    "ingredients": [
      "ごはん",
      "鶏肉",
      "玉ねぎ",
      "ピーマン",
      "きのこ"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 8.7
  },
  {
    "ja": "ラーメン",
    "en": "Ramen",
    "ingredients": [
      "豚肉",
      "卵",
      "ねぎ",
      "のり",
      "もやし"
    ],
    "category": "主食",
    "level": "Intermediate",
    "rating": 9.5
  },
  {
    "ja": "うどん",
    "en": "Udon Noodles",
    "ingredients": [
      "うどん",
      "油揚げ",
      "かまぼこ",
      "ねぎ",
      "わかめ"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 9.0
  },
  {
    "ja": "そば",
    "en": "Soba Noodles",
    "ingredients": [
      "そば",
      "ねぎ",
      "油揚げ",
      "えび"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 8.9
  },
  {
    "ja": "焼きそば",
    "en": "Fried Noodles",
    "ingredients": [
      "豚肉",
      "キャベツ",
      "もやし",
      "にんじん",
      "玉ねぎ"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 9.3
  },
  {
    "ja": "冷やし中華",
    "en": "Chilled Chinese Noodles",
    "ingredients": [
      "鶏肉",
      "卵",
      "きゅうり",
      "ハム",
      "トマト"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 8.8
  },
  {
    "ja": "ちゃんぽん",
    "en": "Champon Noodles",
    "ingredients": [
      "豚肉",
      "えび",
      "いか",
      "キャベツ",
      "もやし",
      "かまぼこ"
    ],
    "category": "主食",
    "level": "Intermediate",
    "rating": 9.1
  },
  {
    "ja": "ナポリタン",
    "en": "Napolitan Pasta",
    "ingredients": [
      "ソーセージ",
      "ピーマン",
      "玉ねぎ",
      "マッシュルーム"
    ],
    "category": "主食",
    "level": "Beginner",
    "rating": 8.7
  }
];