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
  :: ?:  %.y  [cards this(state *state-0)] :: reset state (for testing only)
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
        %add-contact
      =.  state
        ?~  ship.contact.act
          =/  id=@t  random-id
          state(earth-contacts (~(put by earth-contacts) id contact.act))
        =/  ship=@p  u.ship.contact.act
        state(urbit-contacts (~(put by urbit-contacts) ship contact.act))
      :_  state
      [give-update:main ~]
    ==
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
++  on-peek   on-peek:default
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