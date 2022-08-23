/-  *whom
/+  default-agent, dbug, verb
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
      urbit-contacts=(map @p contact)
      earth-contacts=(map @t contact)
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
  [~ this]
::
++  on-save  !>(state)
::
++  on-load
  |=  old-vase=vase
  ^-  (quip card _this)
  :: |^ :: add in when helper arms needed
  =|  cards=(list card)
  ?:  %.y  [cards this(state *state-0)] :: reset state (for testing only)
  =+  !<(old=versioned-state old-vase)
  |-
  ?-  -.old
    %0  [cards this(state old)]
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
  ?+    mark  (on-poke:default mark vase)
      %noun
    ?+    q.vase  (on-poke:default mark vase)
        %print-state
      ~&  >>  state
      ~&  >>>  bowl  [~ this]
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
      =.  state
        ?>  (validate-contact contact.act)
        ?~  ship.contact.act
          =/  id=@t  random-id
          state(earth-contacts (~(put by earth-contacts) id contact.act))
        =/  ship=@p  u.ship.contact.act
        ?:  (~(has by urbit-contacts) ship)  ~|("{<ship>} already exists in contacts!" !!)
        state(urbit-contacts (~(put by urbit-contacts) ship contact.act))
      :_  state
      [give-update:main ~]
      ::
        %del-contact
      =.  state
        ?:  -.key.act
          state(urbit-contacts (~(del by urbit-contacts) `@p`+.key.act))
        state(earth-contacts (~(del by earth-contacts) `@t`+.key.act))
      :_  state
      [give-update:main ~]
      ::
        %edit-contact
      =/  contact  (get-contact key.act)
      =.  info.contact
        ^+  info.contact  (edit-info-map info.act info.contact)
      =.  custom.contact
        ^+  custom.contact  (edit-custom-map custom.act custom.contact)
      =.  state  (replace-contact key.act contact)
      :_  state
      [give-update:main ~]
    ==
  ::
  ++  get-contact
    |=  key=(each @p @t)
    ^-  contact
    ?:  -.key
      =/  ship=@p  `@p`p.key
      (~(got by urbit-contacts) ship)
    =/  id=@t  `@t`p.key
    (~(got by earth-contacts) id)
  ::
  ++  replace-contact
    |=  [key=(each @p @t) =contact]
    ^-  versioned-state
    ?:  -.key
      state(urbit-contacts (~(put by urbit-contacts) `@p`+.key contact))
    state(earth-contacts (~(put by earth-contacts) `@t`+.key contact))
  ::
  ++  edit-info-map
    |=  [changes=(map @tas (unit contact-field)) old=(map @tas contact-field)]
    ^-  (map @tas contact-field)
    =/  acc-type  $_  old
    %-  ~(rep by changes)
    |=  [change=[@tas (unit contact-field)] acc=acc-type]
    (~(mar by acc) change)
  ::
  ++  edit-custom-map
    |=  [changes=(map @t (unit @t)) old=(map @t @t)]
    ^-  (map @t @t)
    =/  acc-type  $_  old
    %-  ~(rep by changes)
    |=  [change=[@t (unit @t)] acc=acc-type]
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
  ^-  (quip card _this)
  ?>  (team:title our.bowl src.bowl)
  ?:  ?=([%updates ~] path)
    =/  =update  [urbit-contacts earth-contacts]
    :_  this
    [[%give %fact [/updates]~ %whom-update !>(update)] ~]
  (on-watch:default path)
::
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:default path)
      [%x %contacts %all ~]  ``contacts-raw-0+!>([urbit-contacts earth-contacts])
  ==
::
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--
|_  =bowl:gall
::
++  give-update
  ^-  card
  =/  =update  [urbit-contacts earth-contacts]
  [%give %fact [/updates]~ %whom-update !>(update)]
::
--