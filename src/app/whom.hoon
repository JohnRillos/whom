/-  *whom, pals-sur=pals, hark=hark-store, g-contacts=contacts
/+  default-agent, dbug, pals-lib=pals, verb
/+  whom-fields, whom-groups, *whom-morf, whom-pals
/~  marks  *  /mar/whom
|%
::
+$  card  card:agent:gall
::
+$  versioned-state
  $%  state-0
      state-1
      state-2
      state-3
      state-4
      state-5
      state-6
      state-7
      state-8
  ==
::
+$  state-0
  $:  %0
      self=self-0
      contacts=(map (each @p @t) contact-0)
      fields=(map @tas field-def-0)
      next-id=@ud
  ==
::
+$  state-1
  $:  %1
      self=self-0
      contacts=(map (each @p @t) contact-0)
      fields=(map @tas field-def-0)
      next-id=@ud
      import-pals=?
  ==
::
+$  state-2  $:(%2 base-state-0)
::
+$  state-3  $:(%3 base-state-0)
::
+$  state-4  $:(%4 base-state-0)
::
+$  state-5  $:(%5 base-state-0)
::
+$  state-6  $:(%6 base-state)
::
+$  state-7  $:(%7 base-state)
::
+$  state-8  $:(%8 base-state)
::
+$  base-state-0
  $:  self=self-1
      contacts=(map (each @p @t) contact-1)
      fields=(map @tas field-def-0)
      next-id=@ud
      import-pals=_|
  ==
::
+$  base-state
  $:  self=self-2
      contacts=(map (each @p @t) contact-2)
      fields=(map @tas field-def-1)
      next-id=@ud
      import-pals=_|
  ==
--
::
=|  state-8
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
    groups     ~(. whom-groups bowl)
::
++  on-init
  ^-  (quip card _this)
  =^  cards  state
    =|  state=state-8
    =.  fields.state  default-fields:whom-fields
    :_  state
    %+  weld  watch-pals:main
    :~  watch-groups-profile:main
        grow-public-profile:main
    ==
  [cards this]
::
++  on-save  !>(state)
::
++  on-load
  |=  old-vase=vase
  ^-  (quip card _this)
  |^  =+  !<(old=versioned-state old-vase)
      =^  cards  state
        (build-state old)
      [cards this]
  ::
  ++  build-state
    |=  old=versioned-state
    ^-  (quip card state-8)
    =|  cards=(list card)
    |-
    ?-  -.old
      %8  [cards old]
      %7  $(old old(- %8), cards (weld cards (cards-7-to-8 old)))
      %6  $(old old(- %7), cards (weld cards cards-6-to-7))
      %5  $(old (state-5-to-6 old), cards (weld cards (cards-5-to-6 old)))
      %4  $(old old(- %5))
      %3  $(old old(- %4), cards (weld cards cards-3-to-4))
      %2  $(old (state-2-to-3 old))
      %1  $(old (state-1-to-2 old), cards (weld cards (cards-1-to-2 old)))
      %0  $(old (state-0-to-1 old), cards watch-pals:main)
    ==
  ::
  ++  state-0-to-1
    |=  old=state-0
    ^-  state-1
    %=  old
      -        %1
      next-id  [next-id.old import-pals=%.n]
    ==
  ::
  ++  state-1-to-2
    |=  old=state-1
    ^-  state-2
    =/  public-info=(map @tas [info-field-0 access-level])
      (~(run by info.self.old) (late %public))
    =/  nu-contacts=contacts-1  (~(run by contacts.old) contact-0-to-1)
    =/  nu-self=self-1  self.old(info public-info)
    %=  old
      -         %2
      contacts  nu-contacts
      self      nu-self
    ==
  ::
  ++  state-2-to-3
    |=  old=state-2
    ^-  state-3
    =.  fields.old  (~(put by fields.old) %bio ['Bio' %text])
    =.  fields.old  (~(put by fields.old) %nickname ['Nickname' %text])
    old(- %3)
  ::
  ++  state-5-to-6
    |=  old=state-5
    ^-  state-6
    =/  nu-fields=(map @tas field-def-1)
      %-  ~(gas by ^-((map @tas field-def-1) fields.old))
      :~  [%avatar ['Avatar' %look]]
          [%color ['Sigil Color' %tint]]
          [%cover ['Cover Image' %look]]
          [%groups ['Favorite Groups' %coll]]
          [%apps ['Favorite Apps' %coll]]
          [%wikis ['Favorite Wikis' %coll]]
      ==
    old(- %6, fields nu-fields)
  ::
  ++  cards-1-to-2
    |=  =state-1
    ^-  (list card)
    %+  weld  (watch-mutual-profiles state-1)
    %-  notify:main
    '1.3.0: New privacy settings: profile fields can now be restricted to pals'
  ::
  ++  cards-3-to-4  ~[leave-contact-store watch-groups-profile:main]
  ::
  ++  cards-5-to-6
    |=  =state-5
    :-  grow-public-profile:main
    (watch-v1-profiles state-5)
  ::
  ++  cards-6-to-7  refresh-groups-profile
  ::
  ++  cards-7-to-8
    |=  =state-7
    =.  state  state-7(- %8)
    give-mutual-profile:main
  ::
  ++  watch-mutual-profiles
    |=  =state-1
    ^-  (list card)
    %+  murn  ~(tap in (mutuals:pals-scry ''))
    |=  =ship
    ?.  (~(has by contacts.state-1) [%.y ship])  ~
    (watch-profile:main ship %.y)
  ::
  ++  leave-contact-store
    ^-  card
    [%pass /groups/profile %agent [our.bowl %contact-store] %leave ~]
  ::
  ++  refresh-groups-profile
    ^-  (list card)
    :~  [%pass /groups/profile/v2 %agent [our.bowl %contacts] %leave ~]
        [%pass /groups/profile/v2 %agent [our.bowl %contacts] %watch /contact]
    ==
  ::
  ++  watch-v1-profiles
    |=  =state-5
    ^-  (list card)
    =/  mutuals=(set @p)  (mutuals:pals-scry '')
    =/  keys=(list (each @p @t))  ~(tap in ~(key by contacts.state-5))
    %+  murn  keys
    |=  key=(each @p @t)
    ?:  ?=(%.n -.key)  ~
    (watch-profile:main +.key (~(has in mutuals) +.key))
  --
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^  ?.  =(our.bowl src.bowl)  ~|('Unauthorized!' !!)
      ?+  mark  (on-poke:default mark vase)
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
        %add-contact
      =.  state  (add-contact ship.act contact.act)
      :_  state
      ?~  ship.act  give-contacts:main
      =/  mutual=?  (~(has in (mutuals:pals-scry '')) u.ship.act)
      %+  weld  give-contacts:main
      (drop (watch-profile:main u.ship.act mutual))
    ::
        %del-contact
      =.  contacts  (~(del by contacts) key.act)
      :_  state
      ?-  -.key.act
        %.y   %+  weld  give-contacts:main
              :~  (leave-public-profile:main p.key.act)
                  (leave-mutual-profile:main p.key.act)
              ==
        %.n   give-contacts:main
      ==
    ::
        %mod-contact-info
      =/  =contact  (~(got by contacts) key.act)
      =.  info.contact  (edit-info-map info.act info.contact)
      ?>  (is-info-valid:main info.contact)
      =.  contacts  (~(put by contacts) key.act contact)
      [give-contacts:main state]
    ::
        %mod-contact-ship
      =/  =contact  (~(got by contacts) key.act)
      =.  contacts  (~(del by contacts) key.act)
      =.  profile.contact  ~
      =.  state  (add-contact ship.act contact)
      =/  cards=(list card)
        %+  weld  give-contacts:main
        =/  old-ship=(unit @p)  ?:(-.key.act ``@p`p.key.act ~)
        %+  weld
          ?~  old-ship  ~
          :~  (leave-public-profile:main u.old-ship)
              (leave-mutual-profile:main u.old-ship)
          ==
        ?~  ship.act  ~
        =/  mutual=?  (~(has in (mutuals:pals-scry '')) u.ship.act)
        (drop (watch-profile:main u.ship.act mutual))
      [cards state]
    ::
        %add-field 
      ?:  (~(has by fields) key.act)
        ~|  "Field {<key.act>} already exists!"  !!
      =.  fields  (~(put by fields) key.act def.act)
      :_  state
      %+  weld  [give-fields:main]~
      (import-unknown-groups-profile-field:main key.act type.def.act)
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
      =.  info.self  (edit-self-map info.act info.self)
      =/  info-fields=(map @tas info-field)  (~(run by info.self) head)
      ?>  (is-info-valid:main info-fields)
      :_  state
      %+  weld  (edit-groups-profile:groups info.act)
      ^-  (list card)
      %-  zing
      :~  [give-self:main]~
           give-public-profile:main
           give-mutual-profile:main
          [grow-public-profile:main]~
      ==
    ::
        %pal-sync
      =.  import-pals  enabled.act
      ?.  enabled.act  [~[give-import-pals:main] state]
      =/  new-pals=(list ship)
        %+  skip  ~(tap in (targets:pals-scry ''))
        |=(=ship (~(has by contacts) [%.y ship]))
      :_  state
      :-  give-import-pals:main
      %+  turn  new-pals
      |=  =ship
      [%pass /pals/import/[(scot %p ship)] %arvo %b %wait now.bowl]
    ::
        %hey-pal
      :_  state
      =/  =cage  [%pals-command !>([%meet ship.act ~])]
      [%pass /hey-pal %agent [our.bowl %pals] %poke cage]~
    ::
        %bye-pal
      :_  state
      =/  =cage  [%pals-command !>([%part ship.act ~])]
      [%pass /bye-pal %agent [our.bowl %pals] %poke cage]~
    ==
  ::
  ++  add-contact
    |=  [ship=(unit @p) =contact]
    ^+  state
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
  ++  edit-info-map  (edit-map info-field)
  ::
  ++  edit-self-map  (edit-map ,[info-field access-level])
  ::
  ++  edit-map
    |*  val-type=mold
    |=  [changes=(map @tas (unit val-type)) old=(map @tas val-type)]
    ^+  old
    %-  ~(rep by changes)
    |=  [change=[@tas (unit val-type)] acc=_old]
    (~(mar by acc) change)
  --
::
++  on-arvo
  |=  [wire=(pole knot) =sign-arvo]
  ^-  (quip card _this)
  ?.  ?=([%behn %wake *] sign-arvo)  (on-arvo:default wire sign-arvo)
  ?+  wire  ~&  >>>  "%wake with unknown wire {<wire>}"  !!
      [%pals %import patp=@ta ~]
    =/  =ship  (slav %p patp.wire)
    [[(poke-self:main [%add-contact `ship *contact])]~ this]
  ::
      [%rewatch patp=@ta %profile ~]
    =/  =ship  (slav %p patp.wire)
    =/  mutual=?  (~(has in (mutuals:pals-scry '')) ship)
    [(drop (watch-profile:main ship mutual)) this]
  ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  |^  :_  this
      ?+  path  (on-watch:default path)
        [%~.2 %contacts ~]         (me (give %whom-contacts-2 contacts))
        [%~.1 %fields ~]           (me (give %whom-fields-1 field-list:field-util:main))
        [%~.1 %self ~]             (me (give %whom-self-2 self))
        [%~.0 %pals ~]             (me (give %whom-pals-0 get:pals-util:main))
        [%~.0 %pals %import ~]     (me (give %loob import-pals))
        [%~.0 %profile %public ~]      (give %whom-profile-0 (profile-2-to-0 public-profile:main))
        [%~.1 %profile %public ~]      (give %whom-profile-2 public-profile:main)
        [%~.0 %profile %mutual ~]  (we (give %whom-profile-1 (profile-2-to-1 mutual-profile:main)))
        [%~.1 %profile %mutual ~]  (we (give %whom-profile-2 mutual-profile:main))
      ==
  ::
  ++  me
    |=  cards=(list card)
    ~|  'Unauthorized!'
    ?>  =(our.bowl src.bowl)
    cards
  ::
  ++  we
    |=  cards=(list card)
    ~|  'Unauthorized! Must be mutual pals!'
    ?>  (~(has in (mutuals:pals-scry '')) src.bowl)
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
  |=  path=(pole knot)
  ^-  (unit (unit cage))
  |^
    ?+  path  (on-peek:default path)
      [%x %~.0 %contacts ~]                ``whom-contacts-1+!>((contacts-2-to-1 contacts))
      [%x %~.0 %contacts %mars ~]          ``whom-contacts-1+!>((contacts-2-to-1 (get-contacts &)))
      [%x %~.0 %contacts %urth ~]          ``whom-contacts-1+!>((contacts-2-to-1 (get-contacts |)))
      [%x %~.0 %contacts %mars key=@ta ~]  ``whom-contact-1+!>((bind (get-contact & key.path) contact-2-to-1))
      [%x %~.0 %contacts %urth key=@ta ~]  ``whom-contact-1+!>((bind (get-contact | key.path) contact-2-to-1))
      [%x %~.0 %contacts %fuse key=@ta ~]  ``whom-contact-1+!>((bind (get-fuse-contact key.path) contact-2-to-1))
      [%x %~.0 %fields ~]                  ``whom-fields-0+!>((fields-1-to-0 field-list:field-util:main))
      [%x %~.0 %self ~]                    ``whom-self-1+!>((self-2-to-1 self))
      [%x %~.0 %pals ~]                    ``whom-pals-0+!>(get:pals-util:main)
      [%x %~.1 %contacts ~]                ``whom-contacts-2+!>(contacts)
      [%x %~.1 %contacts %mars ~]          ``whom-contacts-2+!>((get-contacts &))
      [%x %~.1 %contacts %urth ~]          ``whom-contacts-2+!>((get-contacts |))
      [%x %~.1 %contacts %mars key=@ta ~]  ``whom-contact-2+!>((get-contact & key.path))
      [%x %~.1 %contacts %urth key=@ta ~]  ``whom-contact-2+!>((get-contact | key.path))
      [%x %~.1 %contacts %fuse key=@ta ~]  ``whom-contact-2+!>((get-fuse-contact key.path))
      [%x %~.1 %fields ~]                  ``whom-fields-1+!>(field-list:field-util:main)
      [%x %~.1 %self ~]                    ``whom-self-2+!>(self)
    ==
  ::
  ++  get-contacts
    |=  [mars=?]
    ^-  _contacts
    %-  my
    %+  skim  ~(tap by contacts)
    |=  [key=(each @p @t) *]
    =(-.key mars)
  ::
  ++  get-contact
    |=  [mars=? key=@ta]
    ^-  (unit contact-2)
    %-  ~(get by contacts)
    ?.  mars  [%| key]
    [%& (slav %p key)]
  ::
  ++  get-fuse-contact
    |=  key=@ta
    ^-  (unit contact-2)
    `(build-fuse-contact:main (slav %p key))
  --
::
++  on-agent
  |=  [=^wire =sign:agent:gall]
  ^-  (quip card _this)
  |^  ?+  -.sign  (on-agent:default wire sign)
        %fact       =^  cards  state
                      (handle-fact cage.sign wire)
                    [cards this]
      ::
        %kick       =^  cards  state
                      (handle-kick wire)
                    [cards this]
      ::
        %watch-ack  =^  cards  state
                      ?~  p.sign  (handle-ack wire)
                      (handle-nack wire u.p.sign)
                    [cards this]
      ==
  ::
  ++  handle-fact
    |=  [=cage =^wire]
    ^-  (quip card _state)
    ?+  wire  ~|  "Unknown wire {<wire>}"  !!
        [%~.0 %profile @ta ~]
      (take-profile (profile-0-to-1 !<(profile-0 q.cage)))
    ::
        [%~.0 %profile @ta %mutual ~]
      (take-profile !<(profile-1 q.cage))
    ::
        [%~.1 %profile @ta %public ~]
      (take-profile !<(profile q.cage))
    ::
        [%~.1 %profile @ta %mutual ~]
      (take-profile !<(profile q.cage))
    ::
        [%pals @tas ~]
      =/  =effect:pals-sur  !<(effect:pals-sur q.cage)
      :_  state
      :-  give-pals:main
      ?-  -.effect
          %meet :: you added pal
        ?.  (~(has by contacts) %.y ship.effect)
          ?.  import-pals  ~
          [(poke-self:main [%add-contact `ship.effect *contact])]~
        ?.  (~(has in (mutuals:pals-scry '')) ship.effect)  ~
        (drop (watch-profile:main ship.effect %.y))
      ::
          %near :: pal added you
        ?.  (~(has by contacts) [%.y ship.effect])          ~
        ?.  (~(has in (mutuals:pals-scry '')) ship.effect)  ~
        (drop (watch-profile:main ship.effect %.y))
      ::
          %part :: you removed pal
        :~  [%give %kick ~[/0/profile/mutual] `ship.effect]
            [%give %kick ~[/1/profile/mutual] `ship.effect]
        ==
      ::
          %away :: pal removed you
        :~  [%give %kick ~[/0/profile/mutual] `ship.effect]
            [%give %kick ~[/1/profile/mutual] `ship.effect]
        ==
      ==
    ::
        [%groups %profile %v2 ~]
      =/  =update:g-contacts  !<(update:g-contacts q.cage)
      :_  state
      ?~  con.update  ~
      =/  prof=(map groups-profile-key (unit info-field))
        (contact-as-map:groups con.update)
      %-  zing
      %+  turn  ~(tap by prof)
      import-groups-profile-field:main
    ==
  ::
  ++  take-profile
    |=  =profile
    ^-  (quip card _state)
    =/  key=(each @p @t)  [%.y src.bowl]
    =.  contacts  (~(jab by contacts) key |=(c=contact c(profile `profile)))
    [give-contacts:main state]
  ::
  ++  handle-kick
    |=  =^wire
    ^-  (quip card _state)
    ?+  wire  [~ state]
    ::
        [@ta %profile @ta %public ~]
      :_  state
      (drop (watch-profile:main src.bowl %.n))
    ::
        [@ta %profile @ta %mutual ~]
      :_  state
      =/  mutual=?  (~(has in (mutuals:pals-scry '')) src.bowl)
      (drop (watch-profile:main src.bowl mutual))
    ==
  ::
  ++  handle-ack
    |=  =^wire
    ^-  (quip card _state)
    ?+  wire  [~ state]
    ::
        [%~.1 %profile @ta %mutual ~]
      :_  state
      %+  snoc
        (leave-old-profiles:main src.bowl)
      (leave-public-profile:main src.bowl)
    ::
        [%~.1 %profile @ta %public ~]
      :_  state
      (leave-old-profiles:main src.bowl)
    ==
  ::
  ++  handle-nack
    |=  [=^wire =tang]
    ^-  (quip card _state)
    ?+  wire  ((slog tang) [~ state])
        [%~.1 %profile @ta %public ~]
      :_  state
      (schedule-rewatch-profile src.bowl)
    ::
        [%~.1 %profile @ta %mutual ~]
      :_  state
      %+  weld  (drop (watch-profile:main src.bowl %.n))
      ^-  (list card)
      ?.  (~(has in (mutuals:pals-scry '')) src.bowl)  ~
      (schedule-rewatch-profile src.bowl)
    ==
  ::
  ++  schedule-rewatch-profile
    |=  =ship
    ^-  (list card)
    =/  =^wire  /rewatch/[(scot %p ship)]/profile
    [%pass wire %arvo %b %wait (add ~h1 now.bowl)]~
  --
::
++  on-fail   on-fail:default
--
|_  =bowl:gall
::
++  groups  ~(. whom-groups bowl)
::
++  give-contacts
  ^-  (list card)
  :~
    [%give %fact ~[/2/contacts] %whom-contacts-2 !>(contacts)]
  ==
::
++  give-fields
  [%give %fact ~[/1/fields] %whom-fields-1 !>(field-list:field-util)]
::
++  give-self
  [%give %fact ~[/1/self] %whom-self-2 !>(self)]
::
++  give-public-profile
  ^-  (list card)
  :~
    [%give %fact ~[/0/profile/public] %whom-profile-0 !>((profile-2-to-0 public-profile))]
    [%give %fact ~[/1/profile/public] %whom-profile-2 !>(public-profile)]
  ==
::
++  give-mutual-profile
  ^-  (list card)
  :~
    [%give %fact ~[/0/profile/mutual] %whom-profile-1 !>((profile-2-to-1 mutual-profile))]
    [%give %fact ~[/1/profile/mutual] %whom-profile-2 !>(mutual-profile)]
  ==
::
++  give-import-pals
  [%give %fact ~[/0/pals/import] %loob !>(import-pals)]
::
++  give-pals
  [%give %fact ~[/0/pals] %whom-pals-0 !>(get:pals-util)]
::
++  grow-public-profile
  ^-  card
  [%pass /pro/pub %grow /1/profile/public %whom-profile-2 public-profile]
::
++  public-profile
  ~|  "failed to build public profile"
  ^-  profile-2
  =/  pub-info=(map @tas [info-field access-level])
    ^-  _info.self
    %-  (filter-map info.self)
    |=  [* field=[* =access-level]]
    =(%public access-level.field)
  :-  pub-info
  %-  (filter-map fields)
  |=([key=@tas *] (~(has by pub-info) key))
::
++  mutual-profile
  ^-  profile
  :-  info.self
  %-  (filter-map fields)
  |=([key=@tas *] (~(has by info.self) key))
::
++  filter-map
  |*  raw=(map)
  ?:  =(~ raw)
    |*  $-([* *] ?)  raw
  =*  k  ~+  _?>(?=(^ raw) p.n.raw)
  =*  v  ~+  _?>(?=(^ raw) q.n.raw)
  |=  filter=$-([k v] ?)
  ^-  (map k v)
  %-  my
  =/  tapd=(list (pair k v))  ~(tap by raw)
  (skim tapd filter)
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
  |=  [ship=@p mutual=?]
  ^-  (unit card)
  =/  =wire  /1/profile/(scot %p ship)/[?:(mutual %mutual %public)]
  ?:  (~(has by wex.bowl) [wire ship %whom])  ~
  =/  =path  /1/profile/[?:(mutual %mutual %public)]
  `[%pass wire %agent [ship %whom] %watch path]
::
++  leave-public-profile
  |=  ship=@p
  ^-  card
  [%pass /1/profile/(scot %p ship)/public %agent [ship %whom] %leave ~]
::
++  leave-mutual-profile
  |=  ship=@p
  ^-  card
  [%pass /1/profile/(scot %p ship)/mutual %agent [ship %whom] %leave ~]
::
++  leave-old-profiles
  |=  ship=@p
  ^-  (list card)
  :~  [%pass /0/profile/(scot %p ship) %agent [ship %whom] %leave ~]
      [%pass /0/profile/(scot %p ship)/mutual %agent [ship %whom] %leave ~]
  ==
::
++  watch-pals
  ^-  (list card)
  :~  [%pass /pals/targets %agent [our.bowl %pals] %watch /targets]
      [%pass /pals/leeches %agent [our.bowl %pals] %watch /leeches]
  ==
::
++  watch-groups-profile
  ^-  card
  [%pass /groups/profile/v2 %agent [our.bowl %contacts] %watch /contact]
::
++  poke-self
  |=  =action
  ^-  card
  [%pass [-.action ~] %agent [our.bowl %whom] %poke %whom-action !>(action)]
::
++  notify
  |=  message=@t
  ^-  (list card)
  ?.  .^(? %gu /(scot %p our.bowl)/hark-store/(scot %da now.bowl)/$)  ~
  =/  content=(list content:hark)  ~[text+message]
  =/  =bin:hark     [/[dap.bowl] q.byk.bowl /notification]
  =/  =action:hark  [%add-note bin content ~ now.bowl / /whom]
  =/  =cage         [%hark-action !>(action)]
  [%pass /hark %agent [our.bowl %hark-store] %poke cage]~
::
::  "fuse" contact: falls back to Groups data if profile is not present in %whom
::
++  build-fuse-contact
  |=  =ship
  ^-  contact
  =/  con=(unit contact)  (~(get by contacts) [%& ship])
  :-  ?~(con ~ info.u.con)
  =/  prof=(unit profile)  ?~(con ~ profile.u.con)
  ?~  prof  (scry-contact-as-profile:groups ship)
  prof
::
++  import-unknown-groups-profile-field
  |=  [key=@tas type=@tas]
  ^-  (list card)
  ?.  ?=(groups-profile-key key)  ~
  =/  field=(unit info-field)  (scry-profile-field:groups key)
  (import-groups-profile-field key field)
::
++  import-groups-profile-field
  |=  [key=groups-profile-key value=(unit info-field)]
  ^-  (list card)
  %-  drop
  %+  biff  (~(get by fields) key)
  |=  =field-def
  =/  old  (~(get by info.self) key)
  ?:  =((bind old head) value)  ~
  =/  access=access-level
    ?~  old  %public
    access.u.old
  =/  change=(unit [info-field access-level])
    (bind value (late access))
  =/  changes  (my [key change]~)
  `[(poke-self [%mod-self changes])]
--