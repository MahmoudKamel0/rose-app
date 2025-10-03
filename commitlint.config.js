export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'chore', 'docs', 'style', 'test']],
        'scope-empty': [2, 'never'], // لازم يبقى فيه scope
        'scope-case': [2, 'always', 'kebab-case'],
        'subject-empty': [2, 'never'], // لازم فيه شرح
        'subject-case': [0], // مش هنقيد الكابيتالايزيشن
    },
};
