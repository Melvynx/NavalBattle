using BatailleNavalGinier.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BatailleNavalGinier
{
    public class Startup
    {
        public CorsPolicy GenerateCorsPolicy(){
                var corsBuilder = new CorsPolicyBuilder();
                corsBuilder.AllowAnyHeader();
                corsBuilder.AllowAnyMethod();
                corsBuilder.AllowAnyOrigin(); // For anyone access.
                //corsBuilder.WithOrigins("http://localhost:56573"); // for a specific url. Don't add a forward slash on the end!
                return corsBuilder.Build();
        }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TodoContext>(opt =>
                                    opt.UseInMemoryDatabase("TodoList"));
            services.AddDbContext<CelluleContext>(opt =>
                                    opt.UseInMemoryDatabase("CelluleList"));
            services.AddDbContext<BoardContext>(opt =>
                                    opt.UseInMemoryDatabase("BoardList"));
            services.AddDbContext<GameContext>(opt =>
                                    opt.UseInMemoryDatabase("GameList"));

            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", GenerateCorsPolicy());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowAllOrigins");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
