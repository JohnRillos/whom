/-  *whom, pals-sur=pals, hark=hark-store
/+  default-agent, dbug, pals-lib=pals, verb, whom-fields, whom-pals
|%
::
+$  card  card:agent:gall
::
+$  versioned-state
  $%  state-0
      state-1
  ==
::
+$  state-0
  $:  %0
      =self
      contacts=(map (each @p @t) contact)
      fields=(map @tas field-def)
      next-id=@ud
  ==
::
+$  state-1
  $:  %1
      =self
      contacts=(map (each @p @t) contact)
      fields=(map @tas field-def)
      next-id=@ud
      import-pals=?
  ==
--
::
=|  state-1
=*  state  -
::
%-  agent:dbug
%+  verb  |
^-  agent:gall
=<
|_  =bowl:gall
+*  this         .
    default    ~(. (default-agent this %|) bowl)
    main       ~(. +> bowl)
    pals-scry  ~(. pals-lib bowl)
::
++  on-init
  ^-  (quip card _this)
  =|  =state-0
  =.  fields.state-0  default-fields:whom-fields
  =^  cards  state
    (build-state:main state-0)
  [cards this]
::
++  on-save  !>(state)
::
++  on-load
  |=  old-vase=vase
  ^-  (quip card _this)
  =+  !<(old=versioned-state old-vase)
  =^  cards  state
    (build-state:main old)
  [cards this]
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
  ?.  =(our.bowl src.bowl)  ~|('Unauthorized!' !!)
  ?+    mark  (on-poke:default mark vase)
      %noun
    ?+    q.vase  (on-poke:default mark vase)
        %print-state
      ~&  >>  state  [~ this]
        %print-bowl
      ~&  >>>  bowl  [~ this]
        %print-subscriptions
      ~&  >>  wex.bowl  [~ this]
        %print-subscribers
      ~&  >>  sup.bowl  [~ this]
    ==
    ::
      %whom-action
    =^  cards  state
      (handle-action !<(action vase))
    [cards this]
  ==
  ::
  ++  handle-action
    |=  act=action
    ^-  (quip card _state)
    ?-    -.act
      ::
        %add-contact
      =.  state  (add-contact ship.act contact.act)
      :_  state
      ?~  ship.act  ~[give-contacts:main]
      ~[give-contacts:main (watch-profile:main u.ship.act)]
      ::
        %del-contact
      =.  contacts  (~(del by contacts) key.act)
      :_  state
      ?-  -.key.act
        :: %.y  ~[give-contacts:main]
        %.y  ~[give-contacts:main (leave-profile:main p.key.act)]
        %.n  ~[give-contacts:main]
      ==
      ::
        %mod-contact-info
      =/  contact  (~(got by contacts) key.act)
      =.  info.contact  (edit-info-map info.act info.contact)
      ?>  (is-info-valid:main info.contact)
      =.  contacts  (~(put by contacts) key.act contact)
      [[give-contacts:main ~] state]
      ::
        %mod-contact-ship
      =/  contact   (~(got by contacts) key.act)
      =.  contacts  (~(del by contacts) key.act)
      =.  profile.contact  ~
      =.  state  (add-contact ship.act contact)
      =/  cards=(list card)  ~[give-contacts:main]
      =/  old-ship=(unit @p)  ?:(-.key.act ``@p`p.key.act ~)
      =.  cards
        ?~  old-ship  cards
        (snoc cards (leave-profile:main u.old-ship))
      =.  cards
        ?~  ship.act  cards
        (snoc cards (watch-profile:main u.ship.act))
      [cards state]
      ::
        %add-field
      ?:  (~(has by fields) key.act)
        ~|  "Field {<key.act>} already exists!"  !!
      =.  fields  (~(put by fields) key.act def.act)
      [[give-fields:main ~] state]
      ::
        %del-field
      ?:  (~(has by info.self) key.act)
        ~|("Cannot delete field {<key.act>}: Still in use by your profile!" !!)
      =/  count=@ud
        %-  ~(rep by contacts)
        |=  [entry=[* =contact] acc=@ud]
        ?:  (~(has by info.contact.entry) key.act)  +(acc)
        acc
      ?:  =(count 1)
        ~|("Cannot delete field {<key.act>}: Still in use by 1 contact!" !!)
      ?:  (gth count 1)
        ~|("Cannot delete field {<key.act>}: Still in use by {<count>} contacts!" !!)
      =.  fields  (~(del by fields) key.act)
      [[give-fields:main ~] state]
      ::
        %mod-self
      =.  info.self  (edit-info-map info.act info.self)
      ?>  (is-info-valid:main info.self)
      :_  state
      :~  give-self:main
          give-profile:main
      ==
      ::
        %pal-sync
      =.  import-pals  enabled.act
      ?.  enabled.act  [~[give-import-pals:main] state]
      =/  new-pals=(list ship)
        %+  skip  ~(tap in (targets:pals-scry ''))
        |=  =ship  (~(has by contacts) [%.y ship])
      :_  state
      :-  give-import-pals:main
      %+  turn  new-pals
      |=  =ship
      [%pass /pals/import/[(scot %p ship)] %arvo %b %wait now.bowl]
      ::
        %hey-pal
      :_  state
      =/  =cage  [%pals-command !>([%meet ship.act ~])]
      ~[[%pass /hey-pal %agent [our.bowl %pals] %poke cage]]
      ::
        %bye-pal
      :_  state
      =/  =cage  [%pals-command !>([%part ship.act ~])]
      ~[[%pass /bye-pal %agent [our.bowl %pals] %poke cage]]
    ==
  ::
  ++  add-contact
    |=  [ship=(unit @p) =contact]
    ^-  _state
    ?>  (is-info-valid:main info.contact)
    ?>  =(~ profile.contact)
    =/  key=(each @p @t)
      ?~  ship  [%.n (scot %ud next-id)]
      ?:  =(our.bowl u.ship)  ~|('You cannot add yourself as a contact.' !!)
      [%.y u.ship]
    ?:  (~(has by contacts) key)  ~|("{<p.key>} already exists in contacts!" !!)
    =.  next-id  +(next-id)
    =.  contacts  (~(put by contacts) key contact)
    state
  ::
  ++  edit-info-map
    |=  [changes=(map @tas (unit info-field)) old=(map @tas info-field)]
    ^+  old
    %-  ~(rep by changes)
    |=  [change=[@tas (unit info-field)] acc=_old]
    (~(mar by acc) change)
  ::
  ++  random-id
    ^-  @t
    (scot %uvj eny.bowl)
  --
::
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?.  ?=([%behn %wake *] sign-arvo)  (on-arvo:default wire sign-arvo)
  ?+  wire  ~&  >>>  "%wake with unknown wire {<wire>}"  !!
      [%pals %import @ta ~]
    =/  =ship  (slav %p (rear `(list @ta)`wire))
    [~[(poke-self:main [%add-contact `ship *contact])] this]
  ==
::
++  on-watch
  |=  =path
  |^
  ^-  (quip card _this)
  :_  this
  ?+  path  (on-watch:default path)
    [%~.0 %contacts ~]      (me (give %whom-contacts-0 contacts))
    [%~.0 %fields ~]        (me (give %whom-fields-0 field-list:field-util:main))
    [%~.0 %self ~]          (me (give %whom-self-0 self))
    [%~.0 %pals ~]          (me (give %whom-pals-0 get:pals-util:main))
    [%~.0 %pals %import ~]  (me (give %loob import-pals))
    [%~.0 %profile %public ~]   (give %whom-profile-0 [info.self fields])
  ==
  ::
  ++  me
    |=  cards=(list card)
    ~|  'Unauthorized!'
    ?>  =(our.bowl src.bowl)
    cards
  ::
  ++  give
    |*  [mark=@tas data=*]
    ^-  (list card)
    ~[[%give %fact ~ mark !>(data)]]
  --
::
++  on-leave  on-leave:default
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:default path)
    [%x %~.0 %contacts ~]  ``whom-contacts-0+!>(contacts)
    [%x %~.0 %fields ~]    ``whom-fields-0+!>(field-list:field-util:main)
    [%x %~.0 %self ~]      ``whom-self-0+!>(self)
    [%x %~.0 %pals ~]      ``whom-pals-0+!>(get:pals-util:main)
  ==
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+  -.sign  (on-agent:default wire sign)
      %fact
    =^  cards  state
      (handle-fact:main cage.sign wire)
    [cards this]
  ==
::
++  on-fail   on-fail:default
--
|_  =bowl:gall
::
++  build-state
  |^
  |=  old=versioned-state
  ^-  (quip card state-1)
  =|  cards=(list card)
  |-
  ?-  -.old
    %1  [(weld cards notifications) old]
    %0  $(old (state-0-to-1 old), cards watch-pals)
  ==
  ::
  ++  notifications
    %-  notify
    '1.2.0: You can now manage your %pals in Contacts.'
  ::
  ++  state-0-to-1
    |=  old=state-0
    ^-  state-1
    %=  old
      -        %1
      next-id  [next-id.old import-pals=%.n]
    ==
  --
::
++  give-contacts
  [%give %fact ~[/0/contacts] %whom-contacts-0 !>(contacts)]
::
++  give-fields
  [%give %fact ~[/0/fields] %whom-fields-0 !>(field-list:field-util)]
::
++  give-self
  [%give %fact ~[/0/self] %whom-self-0 !>(self)]
::
++  give-profile
  [%give %fact ~[/0/profile/public] %whom-profile-0 !>([info.self fields])]
::
++  give-import-pals
  [%give %fact ~[/0/pals/import] %loob !>(import-pals)]
::
++  give-pals
  [%give %fact ~[/0/pals] %whom-pals-0 !>(get:pals-util)]
::
++  is-info-valid
  |=  info=(map @tas info-field)
  =/  info-list=(list [@tas info-field])  ~(tap by info)
  (levy info-list is-field-valid)
::
++  is-field-valid
  |=  field=[key=@tas val=info-field]
  ?:  (is-valid:field-util field)  %.y
  ~&  >>>  "Invalid field: {<field>}"  %.n
::
++  field-util  ~(. field-util:whom-fields fields)
::
++  pals-util   ~(. whom-pals bowl)
::
++  watch-profile
  |=  ship=@p
  ^-  card
  [%pass /0/profile/(scot %p ship) %agent [ship %whom] %watch /0/profile/public]
::
++  leave-profile
  |=  ship=@p
  ^-  card
  [%pass /0/profile/(scot %p ship) %agent [ship %whom] %leave ~]
::
++  watch-pals
  ^-  (list card)
  :~  [%pass /pals/targets %agent [our.bowl %pals] %watch /targets]
      [%pass /pals/leeches %agent [our.bowl %pals] %watch /leeches]
  ==
::
++  handle-fact
  |=  [=cage =wire]
  ^-  (quip card _state)
  ?+  wire  ~|  "Unknown wire {<wire>}"  !!
      [%~.0 %profile @p ~]
    =/  =profile  !<(profile q.cage)
    (take-profile profile)
      [%pals @tas ~]
    =/  =effect:pals-sur  !<(effect:pals-sur q.cage)
    :_  state
    :-  give-pals
    ?+  -.effect  ~
        %meet
      ?.  import-pals  ~
      ?:  (~(has by contacts) [%.y ship.effect])  ~
      ~[(poke-self [%add-contact `ship.effect *contact])]
    ==
  ==
::
++  poke-self
  |=  =action
  ^-  card
  [%pass [-.action ~] %agent [our.bowl %whom] %poke %whom-action !>(action)]
::
++  take-profile
  |=  =profile
  ^-  (quip card _state)
  =/  key=(each @p @t)  [%.y src.bowl]
  =/  =contact
    ~|  "No contact: {<src.bowl>}"
    (~(got by contacts) key)
  =.  profile.contact  `profile
  =.  contacts  (~(put by contacts) key contact)
  [[give-contacts ~] state]
::
++  notify
  |=  message=@t
  ^-  (list card)
  ?.  .^(? %gu /(scot %p our.bowl)/hark-store/(scot %da now.bowl))  ~
  =/  content=(list content:hark)  ~[text+message]
  =/  =bin:hark     [/[dap.bowl] q.byk.bowl /notification]
  =/  =action:hark  [%add-note bin content ~ now.bowl / /whom]
  =/  =cage         [%hark-action !>(action)]
  [%pass /hark %agent [our.bowl %hark-store] %poke cage]~
--