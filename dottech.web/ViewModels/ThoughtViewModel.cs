﻿using System;

namespace dottech.web.ViewModels
{
    public class ThoughtViewModel
    {
        public class ThoughtModel
        {
            public Guid Id { get; set; }
            public string URI { get; set; }
            public string Title { get; set; }
            public string Body { get; set; }
            public string ShortDescription { get; set; }
        }
    }
}