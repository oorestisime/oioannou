'''
Hello my name is Orestis Ioannou and this is my Curicculum Vitae
'''
class my_cv(object):

	def __init__(self):
		self.me()
		self.contact()
		self.eduction()
		self.skills()
		self.languages()
		self.experience()
		self.misc()
		
	def me(self):
		self.name="Orestis Ioannou"
		self.status="University Lyon 1"

	def contact(self):
		self.email="contact@oioannou.com"
		self.address="13 rue Moliere, 69006, Lyon, France"
		self.phone="07 62 54 48 49"
		self.website="www.oioannou.com"
		self.github="https://github.com/oorestisime"
	'''
	Education & Skills & Languages
	'''
	def eduction(self):
		self.bsc="Informatics @ University Lyon 1"
		self.bsc_link="http://www.univ-lyon1.fr/"
		self.msc="M1 Informatics onoing @ University Lyon 1"
		self.msc_link="http://master-info.univ-lyon1.fr/M1"

	def skills(self):
		self.programming="Python C/C++ Java PHP"
		self.query="SQL SPARQL XQuery"
		self.web="HTML5 CSS3 JavaScript"
		self.framework="Flask Foundation Bootstrap"

	def languages(self):
		self.native="Greek"
		self.full_proffiency="English French"
	'''
	Experience
	'''
	def experience(self):
		self.experience=[]
		self.experience.append(job("1 month","Create a website for a PhD student","www.toumiak.com"))
		self.experience.append(job("1 month","Create a website for a Mathematician","www.atoumazi.com"))
		self.experience.append(job("2-month","Create and administrate a website for a Ship Supplying company","www.ancora-services.com"))
		self.experience.append(job("2-weeks","Refactoring a website for an artist","www.kanelloscob.com"))
		self.experience.append(job("3-month","Design and create a website for Anosis","www.anosis.com.cy"))
	'''
	Misc
	'''
	def misc(self):
		self.coursera="Stanford University | Cryptography I"
		self.hobbies="Judo for more than 10 years | Travelling "



class job(object):
	def __init__(self,duration,description,link):
		self.duration=duration
		self.desc=description
		self.url=link
	def __repr__(self):
		return "<job> duration:%s desc:%s url:%s </job>" % (self.duration, self.desc,self.url)
	def __str__(self):
		return "<job> duration:%s desc:%s url:%s </job>" % (self.duration, self.desc,self.url)
	
if __name__ == '__main__':
	cv=my_cv()
	for key, value in sorted(cv.__dict__.items()):
		if(key=="experience"):
			for v in value:
				print v
		else: 
			print(key, value)
	print("=========\n")
		



