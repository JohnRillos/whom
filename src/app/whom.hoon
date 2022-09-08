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
      contacts=(map (each @p @t) contact)
      custom-fields=(map @tas field-def)
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
      ?>  (is-contact-valid:main contact.act)
      =/  key=(each @p @t)
        ?~  ship.contact.act  [%.n random-id]
        [%.y u.ship.contact.act]
      ~|  "{<p.key>} already exists in contacts!"  ?<  (~(has by contacts) key)
      =.  state  state(contacts (~(put by contacts) key contact.act))
      [[give-update:main ~] state]
      ::
        %del-contact
      =.  state  state(contacts (~(del by contacts) key.act))
      [[give-update:main ~] state]
      ::
        %edit-contact
      =/  contact  (~(got by contacts) key.act)
      =.  info.contact  (edit-info-map info.act info.contact)
      =.  state  state(contacts (~(put by contacts) key.act contact))
      [[give-update:main ~] state]
      ::
        %add-custom-field
      ?>  custom.def.act
      ~|  "Field {<key.act>} already exists!"
        ?<  (~(has by field-map:field-settings:main) key.act)
      =.  state
        state(custom-fields (~(put by custom-fields) key.act def.act))
      [[give-fields:main ~] state]
    ==
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
  ^-  (quip card _this)
  ?>  (team:title our.bowl src.bowl)
  ?+  path  (on-watch:default path)
    [%updates ~]  [[give-update:main ~] this]
    [%settings %fields ~]  [[give-fields:main ~] this]
  ==
::
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:default path)
    [%x %contacts ~]  ``whom-contacts-0+!>(contacts)
    [%x %settings %fields ~]  ``whom-fields-0+!>(field-list:field-settings:main)
  ==
::
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--
|_  =bowl:gall
::
++  give-update
  ^-  card
  =/  =update  contacts
  [%give %fact [/updates]~ %whom-update !>(update)]
::
++  give-fields
  ^-  card
  =/  =fields-0  field-list:field-settings
  [%give %fact [/settings/fields]~ %whom-fields-0 !>(fields-0)]
::
++  is-contact-valid
  |=  =contact
  =/  info=(list [@tas info-field])  ~(tap by info.contact)
  (levy info is-field-valid)
::
++  is-field-valid
  |=  field=[key=@tas val=info-field]
  ?:  (is-valid:field-settings field)  %.y
  ~&  >>>  "Invalid field: {<field>}"  %.n
::
++  field-settings  (field-util custom-fields)
--