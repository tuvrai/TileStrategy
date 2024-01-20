using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDev
{
    internal record Foo
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; } = string.Empty;

        public Foo()
        {
            
        }

        public Foo(string firstName)
        {
            FirstName = firstName;
        }

        public Foo WithLastName(string lastName)
        {
            return new Foo(this.FirstName, lastName);
        }

        private Foo(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }
    }
}
