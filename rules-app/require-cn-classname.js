module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Enforce using cn() function for className values",
            category: "Best Practices",
            recommended: true,
        },
        messages: {
            useCnFunction: 'className value must use cn() function. Example: className={cn("...")}',
        },
        fixable: null,
        schema: [],
    },

    create(context) {
        return {
            JSXAttribute(node) {
                // تحقق إن الـ attribute هو className
                if (node.name.name !== "className") {
                    return;
                }

                const value = node.value;

                // لو className فاضي أو null
                if (!value) {
                    return;
                }

                // لو الـ value عبارة عن string literal مباشر
                // مثال: className="text-red-500"
                if (value.type === "Literal") {
                    context.report({
                        node,
                        messageId: "useCnFunction",
                    });
                    return;
                }

                // لو الـ value عبارة عن JSXExpressionContainer
                // مثال: className={something}
                if (value.type === "JSXExpressionContainer") {
                    const expression = value.expression;

                    // لو string literal جوا brackets
                    // مثال: className={"text-red-500"}
                    if (expression.type === "Literal") {
                        context.report({
                            node,
                            messageId: "useCnFunction",
                        });
                        return;
                    }

                    // لو template literal
                    // مثال: className={`text-${color}`}
                    if (expression.type === "TemplateLiteral") {
                        context.report({
                            node,
                            messageId: "useCnFunction",
                        });
                        return;
                    }

                    // لو variable بس (مش function call)
                    // مثال: className={myClass}
                    if (expression.type === "Identifier") {
                        context.report({
                            node,
                            messageId: "useCnFunction",
                        });
                        return;
                    }

                    // لو conditional expression
                    // مثال: className={isActive ? "active" : "inactive"}
                    if (expression.type === "ConditionalExpression") {
                        context.report({
                            node,
                            messageId: "useCnFunction",
                        });
                        return;
                    }

                    // تحقق لو هو CallExpression (function call)
                    if (expression.type === "CallExpression") {
                        const callee = expression.callee;

                        // لو الـ function اسمها cn، يبقى تمام
                        if (callee.type === "Identifier" && callee.name === "cn") {
                            return; // كل حاجة تمام
                        }

                        // لو أي function تانية غير cn
                        context.report({
                            node,
                            messageId: "useCnFunction",
                        });
                        return;
                    }

                    // لو أي حاجة تانية
                    context.report({
                        node,
                        messageId: "useCnFunction",
                    });
                }
            },
        };
    },
};
