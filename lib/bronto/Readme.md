
# Bronto integration

- You must enable [**Tracking URL Parameters**](https://app.bronto.com/mail/pref/data_exchange/) for this to work. Then click "Save" at the bottom.
- Also enable [JavaScript Conversion Tracking](http://app.bronto.com/mail/pref/labs/) and the [JavaScript Conversion Report](Javascript Conversion Report
).
- Get your id from the [Direct Add](http://app.bronto.com/mail/pref/data_exchange/) "Create Tracking Cookie" section.

## How it works.

Any link that you put into an email that you send from Bronto, it will get converted to a redirect link that looks something like this:

```
http://app.bronto.com/public/?q=ulink&fn=Link&ssid=32910&id=jtgincmlvm02trf0y1eickt1nclkc&id2=5a27pm8ak306sih3q156q0xtjei19&subscriber_id=bivwgotykolsunaswpanqrnbotcwbae&delivery_id=atddyhkwhssyddjsghzbjrqpqirpbdh&tid=3.gI4.DaQxAC.Gy1-.Acxnpz..Ayb9gw.t....b.W9oUHw.U6oUHw.1rZCMB&td=XXXXX
```

So say you wrote an email like this:

```
Hey there,

We notice you just signed up, if you have any questions feel free to contact support:

http://example.com/support
```

When you click on the link in the email that gets sent from Bronto, it will go through the above redirect, and you will be here:

```
http://example.com/support?_bta_tid=3.gI4.DaQxAC.Gy1-.Acxnpz..Ayb9gw.t....b.W9oUHw.U6oUHw.1rZCMB&_bta_c=c3fa5qinuhew8gd0ocub7rw4xucbd
```

So all it did was attach two parameters to your link, their [Tracking URL Parameters](http://app.bronto.com/mail/pref/data_exchange/):

- `_bta_tid`: this is the customer id
- `_bta_c`

Notice that the `_bta_tid` in your URL is the same as the `tid` parameter in the redirect url:

```
tid      = 3.gI4.DaQxAC.Gy1-.Acxnpz..Ayb9gw.t....b.W9oUHw.U6oUHw.1rZCMB
_bta_tid = 3.gI4.DaQxAC.Gy1-.Acxnpz..Ayb9gw.t....b.W9oUHw.U6oUHw.1rZCMB
```

That is the "contact id" for a specific user mapped to your app. Not sure if that is a globally unique contact id, or it is just unique for that user in relation to your bronto api key.

What happens next is, Bronto's javascript reads that `_bta_tid` from the URL, and uses it to create a cookie. Then, any request you make to the Bronto API will pass that contact id along with it.

## API

### `.identify` resources

- https://app.bronto.com/mail/help/help_view/?k=mail:home:api_tracking:tracking_direct_add

## General Resources

- configuration: https://app.bronto.com/mail/pref/data_exchange/
- support: https://app.bronto.com/shared/support/index/

## Snippets

**Create Tracking Cookie**

```html
<img src="http://app.bronto.com/public/?q=direct_add&fn=Public_DirectAddForm&id=arvdsiahdyhbxhukvignflhdknldben&email=example@example.com&sendWelcome=yes" width="0" height="0" border="0" alt=""/>
```

[![https://i.cloudup.com/qt_i0iYEZh-3000x3000.png](https://i.cloudup.com/qt_i0iYEZh-3000x3000.png)](https://app.bronto.com/mail/pref/data_exchange/)

**Direct Import**

You have the ability to upload contacts directly into Bronto by POSTing a form with various parameters. Further documentation can be found here.

## Adding Subscribe Link

- https://app.bronto.com/mail/help/help_view/?k=mail:messages:create:add_content:editor:messages_create_editor_richtext&hid=adding+a+mailto+link+using+the+wysiwyg+editor#addingamailtolinkusingthewysiwygeditor