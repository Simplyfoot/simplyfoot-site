export interface Founder {
    id: string;
    name: string;
    initials: string;
    roleKey: string;
    spiritKey: string;
    /** Tailwind gradient classes applied to the avatar background */
    gradient: string;
}

export const founders: Founder[] = [
    {
        id: 'romain',
        name: 'Romain Pennacchio',
        initials: 'RP',
        roleKey: 'about.team.romain.role',
        spiritKey: 'about.team.romain.spirit',
        gradient: 'from-[#7A9E8A] via-[#567E66] to-[#3D5C4A]',
    },
    {
        id: 'jean',
        name: 'Jean Carboni',
        initials: 'JC',
        roleKey: 'about.team.jean.role',
        spiritKey: 'about.team.jean.spirit',
        gradient: 'from-[#6E9080] to-[#3D5C4A]',
    },
    {
        id: 'jeremy',
        name: 'Jérémy Baruc',
        initials: 'JB',
        roleKey: 'about.team.jeremy.role',
        spiritKey: 'about.team.jeremy.spirit',
        gradient: 'from-[#7A9E8A] to-[#567E66]',
    },
    {
        id: 'vanessa',
        name: 'Vanessa Rolland',
        initials: 'VR',
        roleKey: 'about.team.vanessa.role',
        spiritKey: 'about.team.vanessa.spirit',
        gradient: 'from-[#A0C1AF] to-[#567E66]',
    },
    {
        id: 'damien',
        name: 'Damien Alfaia',
        initials: 'DA',
        roleKey: 'about.team.damien.role',
        spiritKey: 'about.team.damien.spirit',
        gradient: 'from-[#567E66] to-[#1A2E22]',
    },
];
