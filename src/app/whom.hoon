/-  *whom
/+  default-agent, dbug, verb, whom-fields
|%
::
+$  card  card:agent:gall
::
+$  versioned-state
  $%  state-0
  ==
::
+$  state-0
  $:  %0
      =self
      contacts=(map (each @p @t) contact)
      fields=(map @tas field-def)
      next-id=@ud
  ==
--
::
=|  state-0
=*  state  -
::
%-  agent:dbug
%+  verb  |
^-  agent:gall
=<
|_  =bowl:gall
+*  this     .
    default  ~(. (default-agent this %|) bowl)
    main     ~(. +> bowl)
::
++  on-init
  ^-  (quip card _this)
  =.  state  *state-0
  =.  fields  default-fields:whom-fields
  [~ this]
::
++  on-save  !>(state)
::
++  on-load
  |=  old-vase=vase
  ^-  (quip card _this)
  |^
  =|  cards=(list card)
  ?:  %.y  (reset-state cards) :: (for testing only)
  =+  !<(old=versioned-state old-vase)
  |-
  ?-  -.old
    %0  [cards this(state old)]
  ==
  ::
  ++  reset-state :: (testing only)
    |=  cards=(list card)
    =.  cards  (weld cards leave-all)
    =/  new-state  *state-0
    =/  default-fields  default-fields:whom-fields
    [cards this(state new-state(fields default-fields))]
  ::
  ++  leave-all :: (testing only)
    ^-  (list card)
    =/  wex=(map [=wire =ship =term] [* *])  wex.bowl
    =/  subs=(list [=wire =ship =term])
      ~(tap in ~(key by wex.bowl))
    %+  turn  subs
    |=  [=wire =ship =term]
    [%pass wire %agent [ship term] %leave ~]
  --
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
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
    ~&  >  %whom-action
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
        %.y  ~[give-contacts:main (leave-profile:main p.key.act)]
        %.n  ~[give-contacts:main]
      ==
      ::
        %edit-contact
      =/  contact  (~(got by contacts) key.act)
      =.  info.contact  (edit-info-map info.act info.contact)
      ?>  (is-info-valid:main info.contact)
      =.  contacts  (~(put by contacts) key.act contact)
      [[give-contacts:main ~] state]
      ::
        %edit-contact-ship
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
      ~|  "Field {<key.act>} already exists!"
        ?<  (~(has by fields) key.act)
      =.  fields  (~(put by fields) key.act def.act)
      [[give-fields:main ~] state]
      ::
        %del-field
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
        %edit-self
      =.  info.self  (edit-info-map info.act info.self)
      ?>  (is-info-valid:main info.self)
      :_  state
      :~  give-self:main
          give-profile:main
      ==
    ==
  ::
  ++  add-contact
    |=  [ship=(unit @p) =contact]
    ^-  _state
    ?>  (is-info-valid:main info.contact)
    ?>  =(~ profile.contact)
    =/  key=(each @p @t)
      ?~  ship  [%.n (scot %ud next-id)]
      ~|  'You cannot add yourself as a contact.'
        ?<  =(our.bowl u.ship)
      [%.y u.ship]
    ~|  "{<p.key>} already exists in contacts!"  ?<  (~(has by contacts) key)
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
++  on-arvo   on-arvo:default
::
++  on-watch
  |=  =path
  |^
  ~&  "{<src.bowl>} subscribed to {<path>}"
  ^-  (quip card _this)
  ?+  path  (on-watch:default path)
    [%contacts ~]  %-  me  [[give-contacts:main ~] this]
    [%fields ~]    %-  me  [[give-fields:main ~] this]
    [%self ~]      %-  me  [[give-self:main ~] this]
    [%profile %public ~]   [[give-profile:main ~] this]
  ==
  ++  me
    |=  quip=(quip card _this)
    ~|  'Unauthorized!'
    ?>  (team:title our.bowl src.bowl)
    quip
  --
::
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:default path)
    [%x %contacts ~]  ``whom-contacts-0+!>(contacts)
    [%x %fields ~]    ``whom-fields-0+!>(field-list:field-util:main)
    [%x %self ~]      ``whom-self-0+!>(self)
  ==
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+  -.sign  (on-agent:default wire sign)
      %fact
    =^  cards  state
      (handle-fact:main cage.sign)
    [cards this]
  ==
::
++  on-fail   on-fail:default
--
|_  =bowl:gall
::
++  give-contacts
  ^-  card
  =/  =contacts-0  contacts
  [%give %fact [/contacts]~ %whom-contacts-0 !>(contacts-0)]
::
++  give-fields
  ^-  card
  =/  =fields-0  field-list:field-util
  [%give %fact [/fields]~ %whom-fields-0 !>(fields-0)]
::
++  give-self
  ^-  card
  [%give %fact [/self]~ %whom-self-0 !>(self)]
::
++  give-profile
  ^-  card
  =/  =profile  [info.self field-list:field-util]
  [%give %fact [/profile/public]~ %whom-profile-0 !>(profile)]
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
++  watch-profile
  |=  ship=@p
  ^-  card
  ~&  "Subscribing to {<ship>}'s profile..."
  [%pass /profile/(scot %p ship) %agent [ship %whom] %watch /profile/public]
::
++  leave-profile
  |=  ship=@p
  ^-  card
  ~&  "Unsubscribing from {<ship>}'s profile..."
  [%pass /profile/(scot %p ship) %agent [ship %whom] %leave ~]
::
++  handle-fact
  |=  =cage
  ^-  (quip card _state)
  ?+  -.cage  ~|  "Unknown cage {<cage>}"  !!
      %whom-profile-0  
    =/  =profile  !<(profile q.cage)
    (take-profile profile)
  ==
::
++  take-profile
  |=  =profile
  ^-  (quip card _state)
  ~&  >  <profile>
  =/  key=(each @p @t)  [%.y src.bowl]
  ~|  "No contact: {<src.bowl>}"
  =/  =contact  (~(got by contacts) key)
  =.  profile.contact  `profile
  =.  contacts  (~(put by contacts) key contact)
  [[give-contacts ~] state]
--