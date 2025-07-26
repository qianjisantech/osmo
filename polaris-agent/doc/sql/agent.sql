create table gosmo_agent_info
(
    id              INTEGER
        constraint id
            primary key autoincrement,
    name            TEXT                           not null,
    status          TEXT                           not null,
    cpu             TEXT                           not null,
    network         TEXT                           not null,
    memory          TEXT                           not null,
    disk            TEXT                           not null,
    start_time      TEXT default (datetime('now')) not null,
    stop_time       TEXT default (datetime('now')) not null,
    remote_agent_id TEXT                           not null,
    type            TEXT                           not null
);

create table gosmo_agent_ops_log
(
    id          INTEGER
        constraint id
            primary key autoincrement,
    ops_type    TEXT                           not null,
    log_level   TEXT                           not null,
    log_info    TEXT                           not null,
    create_time TEXT default (datetime('now')) not null
);

create table gosmo_agent_task
(
    id             INTEGER
        constraint id
            primary key autoincrement,
    name           TEXT                           not null,
    status         TEXT                           not null,
    start_time     TEXT,
    end_time       TEXT,
    create_time    TEXT default (datetime('now')) not null,
    create_by      TEXT                           not null,
    create_by_name TEXT                           not null,
    update_time    TEXT default (datetime('now')) not null,
    update_by      TEXT                           not null,
    update_by_name TEXT                           not null,
    remote_task_id TEXT                           not null,
    type           TEXT                           not null
);

