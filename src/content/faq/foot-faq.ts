export interface FaqQuestion {
    id: string;
    questionKey: string;
    answerKey: string;
}

export interface FaqCategory {
    id: string;
    titleKey: string;
    questions: FaqQuestion[];
}

export const faqCategories: FaqCategory[] = [
    {
        id: 'general',
        titleKey: 'faq.categories.general',
        questions: [
            {
                id: 'what-is',
                questionKey: 'faq.general.whatIs.q',
                answerKey: 'faq.general.whatIs.a',
            },
            {
                id: 'who-for',
                questionKey: 'faq.general.whoFor.q',
                answerKey: 'faq.general.whoFor.a',
            },
            {
                id: 'which-sports',
                questionKey: 'faq.general.whichSports.q',
                answerKey: 'faq.general.whichSports.a',
            },
            {
                id: 'how-different',
                questionKey: 'faq.general.howDifferent.q',
                answerKey: 'faq.general.howDifferent.a',
            },
        ],
    },
    {
        id: 'getting-started',
        titleKey: 'faq.categories.gettingStarted',
        questions: [
            {
                id: 'how-register',
                questionKey: 'faq.gettingStarted.howRegister.q',
                answerKey: 'faq.gettingStarted.howRegister.a',
            },
            {
                id: 'join-club',
                questionKey: 'faq.gettingStarted.joinClub.q',
                answerKey: 'faq.gettingStarted.joinClub.a',
            },
            {
                id: 'create-club',
                questionKey: 'faq.gettingStarted.createClub.q',
                answerKey: 'faq.gettingStarted.createClub.a',
            },
            {
                id: 'multi-role',
                questionKey: 'faq.gettingStarted.multiRole.q',
                answerKey: 'faq.gettingStarted.multiRole.a',
            },
        ],
    },
    {
        id: 'convocations',
        titleKey: 'faq.categories.convocations',
        questions: [
            {
                id: 'how-send',
                questionKey: 'faq.convocations.howSend.q',
                answerKey: 'faq.convocations.howSend.a',
            },
            {
                id: 'respond',
                questionKey: 'faq.convocations.respond.q',
                answerKey: 'faq.convocations.respond.a',
            },
            {
                id: 'track',
                questionKey: 'faq.convocations.track.q',
                answerKey: 'faq.convocations.track.a',
            },
            {
                id: 'recurring',
                questionKey: 'faq.convocations.recurring.q',
                answerKey: 'faq.convocations.recurring.a',
            },
        ],
    },
    {
        id: 'parents',
        titleKey: 'faq.categories.parents',
        questions: [
            {
                id: 'separated',
                questionKey: 'faq.parents.separated.q',
                answerKey: 'faq.parents.separated.a',
            },
            {
                id: 'link-child',
                questionKey: 'faq.parents.linkChild.q',
                answerKey: 'faq.parents.linkChild.a',
            },
            {
                id: 'both-see',
                questionKey: 'faq.parents.bothSee.q',
                answerKey: 'faq.parents.bothSee.a',
            },
        ],
    },
    {
        id: 'messaging',
        titleKey: 'faq.categories.messaging',
        questions: [
            {
                id: 'how-works',
                questionKey: 'faq.messaging.howWorks.q',
                answerKey: 'faq.messaging.howWorks.a',
            },
            {
                id: 'channels',
                questionKey: 'faq.messaging.channels.q',
                answerKey: 'faq.messaging.channels.a',
            },
            {
                id: 'notifications',
                questionKey: 'faq.messaging.notifications.q',
                answerKey: 'faq.messaging.notifications.a',
            },
        ],
    },
    {
        id: 'president',
        titleKey: 'faq.categories.president',
        questions: [
            {
                id: 'what-manage',
                questionKey: 'faq.president.whatManage.q',
                answerKey: 'faq.president.whatManage.a',
            },
            {
                id: 'budget',
                questionKey: 'faq.president.budget.q',
                answerKey: 'faq.president.budget.a',
            },
            {
                id: 'teams',
                questionKey: 'faq.president.teams.q',
                answerKey: 'faq.president.teams.a',
            },
        ],
    },
    {
        id: 'pricing',
        titleKey: 'faq.categories.pricing',
        questions: [
            { id: 'free', questionKey: 'faq.pricing.free.q', answerKey: 'faq.pricing.free.a' },
            { id: 'packs', questionKey: 'faq.pricing.packs.q', answerKey: 'faq.pricing.packs.a' },
            {
                id: 'payment',
                questionKey: 'faq.pricing.payment.q',
                answerKey: 'faq.pricing.payment.a',
            },
        ],
    },
    {
        id: 'pilot',
        titleKey: 'faq.categories.pilot',
        questions: [
            { id: 'what-is', questionKey: 'faq.pilot.whatIs.q', answerKey: 'faq.pilot.whatIs.a' },
            {
                id: 'how-join',
                questionKey: 'faq.pilot.howJoin.q',
                answerKey: 'faq.pilot.howJoin.a',
            },
            {
                id: 'reinstall',
                questionKey: 'faq.pilot.reinstall.q',
                answerKey: 'faq.pilot.reinstall.a',
            },
        ],
    },
    {
        id: 'support',
        titleKey: 'faq.categories.support',
        questions: [
            {
                id: 'contact',
                questionKey: 'faq.support.contact.q',
                answerKey: 'faq.support.contact.a',
            },
            { id: 'bug', questionKey: 'faq.support.bug.q', answerKey: 'faq.support.bug.a' },
            {
                id: 'updates',
                questionKey: 'faq.support.updates.q',
                answerKey: 'faq.support.updates.a',
            },
        ],
    },
];
