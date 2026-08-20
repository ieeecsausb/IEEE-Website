import { useMemo, useState } from 'react';
import { MASATHON_SHORTLIST } from './masathonShortlist';
import { COIN, MUSHROOM, PixelSprite, STAR } from './PixelArt';

const FILTERS = [
    { id: 'All', label: 'ALL TEAMS', color: '#fbd000' },
    { id: 'AI', label: 'AI DOMAIN', color: '#ff2bd1' },
    { id: 'Game', label: 'GAME DOMAIN', color: '#43b047' },
];

const DOMAIN_META = {
    AI: { label: 'AI', color: '#ff2bd1', icon: STAR },
    Game: { label: 'GAME', color: '#43b047', icon: MUSHROOM },
};

const SHORTLIST_TOTALS = {
    all: MASATHON_SHORTLIST.length,
    AI: MASATHON_SHORTLIST.filter((team) => team.domain === 'AI').length,
    Game: MASATHON_SHORTLIST.filter((team) => team.domain === 'Game').length,
};

function RosterColumn({ teams, label }) {
    return (
        <ol className="ma-roster-column" aria-label={label}>
            {teams.map((team) => {
                const domain = DOMAIN_META[team.domain];
                return (
                    <li key={team.id} className="ma-roster-row" style={{ ['--domain']: domain.color }}>
                        <span className="ma-roster-rank" aria-label={`Team number ${team.id}`}>
                            {String(team.id).padStart(2, '0')}
                        </span>
                        <span className="ma-roster-copy">
                            <strong>{team.team}</strong>
                            <span className="ma-roster-college">{team.college}</span>
                        </span>
                        <span className="ma-domain-tag" style={{ ['--domain']: domain.color }}>
                            <PixelSprite map={domain.icon} style={{ width: 14, height: 14 }} />
                            {domain.label}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
}

export default function ShortlistedTeams({ play }) {
    const [filter, setFilter] = useState('All');

    const visibleTeams = useMemo(
        () => (filter === 'All' ? MASATHON_SHORTLIST : MASATHON_SHORTLIST.filter((team) => team.domain === filter)),
        [filter],
    );
    const splitAt = Math.ceil(visibleTeams.length / 2);
    const columns = [visibleTeams.slice(0, splitAt), visibleTeams.slice(splitAt)];

    const selectFilter = (nextFilter) => {
        setFilter(nextFilter);
        play('select');
    };

    return (
        <div className="ma-shortlist-shell">
            <div className="ma-result-banner ma-reveal">
                <div className="ma-result-banner-icon" aria-hidden="true">
                    <PixelSprite map={STAR} className="ma-star-hue" style={{ width: 52, height: 52 }} />
                </div>
                <div>
                    <span>ROUND 1 COMPLETE</span>
                    <strong>PLAYER SELECT: ROUND 2</strong>
                    <p>These 34 teams have unlocked the offline prototype-development round.</p>
                </div>
                <div className="ma-result-banner-icon ma-result-banner-icon-end" aria-hidden="true">
                    <PixelSprite map={COIN} className="ma-coin-spin" style={{ width: 34, height: 44 }} />
                </div>
            </div>

            <div className="ma-result-stats ma-reveal" aria-label="Shortlist summary">
                <div className="ma-result-stat" style={{ ['--stat']: '#fbd000' }}>
                    <span>QUALIFIED</span>
                    <strong>{SHORTLIST_TOTALS.all}</strong>
                    <small>TEAMS</small>
                </div>
                <div className="ma-result-stat" style={{ ['--stat']: '#ff2bd1' }}>
                    <span>AI DOMAIN</span>
                    <strong>{SHORTLIST_TOTALS.AI}</strong>
                    <small>TEAMS</small>
                </div>
                <div className="ma-result-stat" style={{ ['--stat']: '#43b047' }}>
                    <span>GAME DOMAIN</span>
                    <strong>{SHORTLIST_TOTALS.Game}</strong>
                    <small>TEAMS</small>
                </div>
                <div className="ma-result-stat" style={{ ['--stat']: '#00e5ff' }}>
                    <span>ROUND 2</span>
                    <strong className="ma-result-date">29/08</strong>
                    <small>2026</small>
                </div>
            </div>

            <div className="ma-roster-toolbar ma-reveal">
                <div>
                    <span className="ma-roster-eyebrow">OFFICIAL QUALIFIER ROSTER</span>
                    <p aria-live="polite">
                        SHOWING {visibleTeams.length} OF {MASATHON_SHORTLIST.length} TEAMS
                    </p>
                </div>
                <div className="ma-result-filters" role="group" aria-label="Filter shortlisted teams by domain">
                    {FILTERS.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="ma-result-filter"
                            data-active={filter === item.id}
                            aria-pressed={filter === item.id}
                            style={{ ['--filter']: item.color }}
                            onClick={() => selectFilter(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="ma-roster-frame ma-reveal">
                <div className="ma-roster-header" aria-hidden="true">
                    <span>NO.</span>
                    <span>TEAM / INSTITUTION</span>
                    <span>DOMAIN</span>
                </div>
                <div className="ma-roster-grid" key={filter}>
                    <RosterColumn teams={columns[0]} label={`${filter} shortlisted teams, first column`} />
                    <RosterColumn teams={columns[1]} label={`${filter} shortlisted teams, second column`} />
                </div>
                <div className="ma-roster-footer">
                    <span>★ CONGRATULATIONS, PLAYERS! ★</span>
                    <span>ROUND 2 · VIVEKANANDA AUDITORIUM · CEG CAMPUS</span>
                </div>
            </div>

            <p className="ma-shortlist-note ma-reveal">
                SHORTLISTED TEAMS: WATCH FOR OFFICIAL ROUND 2 INSTRUCTIONS FROM THE ORGANIZERS.
            </p>
        </div>
    );
}
