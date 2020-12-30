    } else {
48
      message.reply("You need to join a voice channel first!");
49
    }
50
  }
51
  if (
52
    message.author.bot ||
53
    message.channel.type !== "dm" ||
54
    !message.content.includes("")
55
  )
56
    return;
57
​
58
  var user = message.author;
59
  if (db.get(user.id) == undefined) {
60
    db.ensure(user.id, {
61
      last: null
62
    });
63
  }
64
​
65
  if (
66
    db.get(user.id, "last") !== null &&
67
    moment().diff(moment(parseInt(db.get(user.id, "last"))), "h") < time
68
  ) {
69
    message.channel.send(
70
      `> **You need to wait until it ends ${moment(
71
        parseInt(db.get(user.id, "last"))
72
      )
73
        .add(time, "h")
74
        .fromNow()}**`
75
    );
76
    return;
77
  }
78
​
79
  var ad_message = message.content
80
    .replace("@everyone", "")
81
    .replace("@here", "");
82
​
83
  client.channels.cache
84
    .get(config.ad_channel)
85
    .send(ad_message + "\n\n<@" + user.id + ">");
86
​
87
  message.channel.send(
88
     "https://discord.gg/xqGV56S3"  +
89
      client.channels.cache.get(config.ad_channel).id +
90
      ""
91
  );
92
​
93
  db.set(user.id, moment().format("x"), "last");
94
});
95
client.login(token);
96
​
