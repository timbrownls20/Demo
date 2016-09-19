//http://stackoverflow.com/questions/2417647/is-there-an-equivalent-to-javas-tostringbuilder-for-c-what-would-a-good-c-sha
// forgive the mangled code; I hate horizontal scrolling

using System;
using System.Linq.Expressions;
using System.Text;

namespace Automapper.Infrastructure
{
    public sealed class ToStringBuilder<T>
    {
        private T _obj;
        private Type _objType;
        private StringBuilder _innerSb;

        public ToStringBuilder(T obj)
        {
            _obj = obj;
            _objType = obj.GetType();
            _innerSb = new StringBuilder();
        }

        public ToStringBuilder<T> Append<TProperty>
            (Expression<Func<T, TProperty>> expression)
        {

            string propertyName;
            if (!TryGetPropertyName(expression, out propertyName))
                throw new ArgumentException(
                    "Expression must be a simple property expression."
                    );

            Func<T, TProperty> func = expression.Compile();

            var propertyValue = func(_obj);
            if (propertyValue != null)
            {
                if (_innerSb.Length >= 1)
                {
                    _innerSb.Append(", ");
                }
                _innerSb.Append(propertyName + ": " + propertyValue);
            }

            return this;
        }

        private bool TryGetPropertyName<TProperty>
            (Expression<Func<T, TProperty>> expression, out string propertyName)
        {

            propertyName = default(string);

            var propertyExpression = expression.Body as MemberExpression;
            if (propertyExpression == null)
                return false;

            propertyName = propertyExpression.Member.Name;
            return true;
        }

        public override string ToString()
        {
            return _objType.Name + "{" + _innerSb + "}";
        }
    }
}