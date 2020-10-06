from flask import Blueprint
from models import Course


usersbp = Blueprint('seed', __name__)
@usersbp.cli.command('courses')
def seed():
    """Seed the database."""
    #level 1
    course1 = Course(course_id = 'ARAB 100', name = 'Writing Skills', level = 1)
    course2 = Course(course_id = 'CHEM101', name = 'General Chemistry (1)', level = 1)
    course3 = Course(course_id = 'ENGS 100', name = 'English', level = 1)
    course4 = Course(course_id = 'MATH 101', name = 'Differential Calculus', level = 1)

    #level 2
    course5 = Course(course_id = 'CI 101', name = 'University Skills', level = 2)
    course6 = Course(course_id = 'CT 101', name = 'IT Skills', level = 2)
    course7 = Course(course_id = 'ENGS 110', name = 'English', level = 2)
    course8 = Course(course_id = 'ENT 101', name = 'Entrepreneurship', level = 2)
    course9 = Course(course_id = 'EPH 101', name = 'Fitness and Health Education', level = 2)
    course10 = Course(course_id = 'STAT 101', name = 'An Introduction to Probability & Statistics', level = 2)
    #level 3
    course11 = Course(course_id = 'CSC 111', name = 'Computer Programming (1)', level = 3)
    course12 = Course(course_id = 'MATH106', name = 'INTEGRAL CALCULUS', level = 3)
    course13 = Course(course_id = 'MATH151', name = 'DISCRETE MATHEMATICS', level = 3)
    course14 = Course(course_id = 'PHYS103', name = 'GENERAL PHYSICS (1)', level = 3)
    #level 4

    course15 = Course(course_id = 'CENX303', name = 'Computer Communications & Networks', level = 4)
    course16 = Course(course_id = 'CSC 113', name = 'Computer Programming (2)', level = 4)
    course17 = Course(course_id = 'MATH244', name = 'Linear Algebra', level = 4)
    course18 = Course(course_id = 'PHYS104', name = 'GENERAL PHYSICS (2)', level = 4)
    course19 = Course(course_id = 'SWE 211', name = 'Introduction to Software Engineering', level = 4)
    #level 5

    course20 = Course(course_id = 'CSC 212', name = 'Data Structures', level = 5)
    course21 = Course(course_id = 'CSC 220', name = 'Computer Organization', level = 5)
    course22 = Course(course_id = 'SWE 312', name = 'Software Requirements Engineering', level = 5)
    course23 = Course(course_id = 'SWE 314', name = 'Software Security Engineering', level = 5)
    #level 6

    course24 = Course(course_id = 'CSC 227', name = 'OPERATING SYSTEMS', level = 6)
    course25 = Course(course_id = 'IS 230', name = 'INTRODUCTION TO DATABASE SYSTEMS', level = 6)
    course26 = Course(course_id = 'SWE 321', name = 'Software Design & Architecture', level = 6)
    course27 = Course(course_id = 'SWE 333', name = 'Software Quality Assurance', level = 6)
    course28 = Course(course_id = 'SWE 381', name = 'Web Application Development', level = 6)
    #level 7

    course29 = Course(course_id = 'IC 107', name = 'Professional Ethics', level = 7)
    course30 = Course(course_id = 'SWE 434', name = 'Software Testing and Validation', level = 7)
    course31 = Course(course_id = 'SWE 444', name = 'Software Construction Laboratory', level = 7)
    course32 = Course(course_id = 'SWE 477', name = 'Software Engineering Code of Ethics & Professional Practice', level = 7)
    course33 = Course(course_id = 'SWE 479', name = 'Practical Training', level = 7)
    course34 = Course(course_id = 'SWE 482', name = 'Human-Computer Interaction', level = 7)
    course35 = Course(course_id = 'SWE 496', name = 'Graduation Project (1)', level = 7)
    #level 8

    course36 = Course(course_id = 'IC 108', name = 'Current Issues', level = 8)
    course37 = Course(course_id = 'SWE 455', name = 'Software Maintenance and Evolution', level = 8)
    course38 = Course(course_id = 'SWE 466', name = 'Software Project Management', level = 8)
    course39 = Course(course_id = 'SWE 497', name = 'Graduation Project (2)', level = 8)



    course1.insert()
    course2.insert()
    course3.insert()
    course4.insert()
    course5.insert()
    course6.insert()
    course7.insert()
    course8.insert()
    course9.insert()
    course10.insert()
    course11.insert()
    course12.insert()
    course13.insert()
    course14.insert()
    course15.insert()
    course16.insert()
    course17.insert()
    course18.insert()
    course19.insert()
    course20.insert()
    course21.insert()
    course22.insert()
    course23.insert()
    course24.insert()
    course25.insert()
    course26.insert()
    course27.insert()
    course28.insert()
    course29.insert()
    course30.insert()   
    course31.insert()
    course32.insert()
    course33.insert()
    course34.insert()
    course35.insert()
    course36.insert()
    course37.insert()
    course38.insert()
    course39.insert()




